import argparse
import json
import sys
from pathlib import Path

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler, LabelEncoder
from sklearn.svm import SVC

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "models"
MODEL_DIR.mkdir(exist_ok=True)

DATASETS = {
    "flood": {
        "file": "flood_india.csv",
        "target": "Flood Occurred",
        "model": "svm",
        "feature_map": {
            "latitude": "Latitude",
            "longitude": "Longitude",
            "rainfall": "Rainfall (mm)",
            "temperature": "Temperature (Celsius)",
            "humidity": "Humidity (%)",
            "river_discharge": "River Discharge (m^3/s)",
            "water_level": "Water Level (m)",
            "elevation": "Elevation (m)",
            "surface_water_state": "Surface Water State",
            "land_cover": "Land Cover",
            "soil_type": "Soil Type",
            "population_density": "Population Density",
            "historical_floods": "Historical Floods"
        },
        "numeric": [
            "latitude",
            "longitude",
            "rainfall",
            "temperature",
            "humidity",
            "river_discharge",
            "water_level",
            "elevation",
            "population_density",
            "historical_floods"
        ],
        "categorical": ["surface_water_state", "land_cover", "soil_type"],
        "labels": {0: "No Flood Expected", 1: "Flood Expected"}
    },
    "landslide": {
        "file": "landslide_india_dataset.csv",
        "target": "Landslide Occurred",
        "model": "xgboost",
        "feature_map": {
            "latitude": "Latitude",
            "longitude": "Longitude",
            "rainfall": "Rainfall (mm)",
            "temperature": "Temperature (Celsius)",
            "soil_moisture": "Soil Moisture (%)",
            "slope_angle": "Slope Angle (°)",
            "elevation": "Elevation (m)",
            "terrain_aspect": "Terrain Aspect (°)",
            "lithology": "Lithology",
            "land_cover": "Land Cover",
            "soil_type": "Soil Type",
            "distance_to_road": "Distance to Road (m)",
            "historical_landslides": "Historical Landslides"
        },
        "numeric": [
            "latitude",
            "longitude",
            "rainfall",
            "temperature",
            "soil_moisture",
            "slope_angle",
            "elevation",
            "terrain_aspect",
            "distance_to_road",
            "historical_landslides"
        ],
        "categorical": ["lithology", "land_cover", "soil_type"],
        "labels": {0: "Low Landslide Risk", 1: "High Landslide Risk"}
    },
    "tsunami": {
        "file": "Tsunami_dataset.csv",
        "target": "tsunami",
        "model": "xgboost",
        "feature_map": {
            "latitude": "latitude",
            "longitude": "longitude",
            "year": "Year",
            "month": "Month",
            "cdi": "cdi",
            "mmi": "mmi",
            "sig": "sig",
            "magnitude": "magnitude",
            "nst": "nst",
            "dmin": "dmin",
            "gap": "gap",
            "depth": "depth",
            "volcanic_eruption": "volcanic eruption"
        },
        "numeric": [
            "latitude",
            "longitude",
            "year",
            "month",
            "cdi",
            "mmi",
            "sig",
            "magnitude",
            "nst",
            "dmin",
            "gap",
            "depth"
        ],
        "categorical": ["volcanic_eruption"],
        "labels": {0: "No Tsunami Triggered", 1: "Potential Tsunami"}
    },
    "earthquake": {
        "file": "Earthquakes.csv",
        "target": "Earthquake Intensity",
        "model": "xgboost",
        "feature_map": {
            "latitude": "latitude",
            "longitude": "longitude",
            "depth": "depth",
            "magnitude": "mag",
            "mag_type": "magType",
            "nst": "nst",
            "gap": "gap",
            "dmin": "dmin",
            "rms": "rms",
            "alert_level": "Alert Level",
            "seismic_wave": "seismic_wave",
            "energy": "Energy(10¹⁰ kJ)"
        },
        "numeric": [
            "latitude",
            "longitude",
            "depth",
            "magnitude",
            "nst",
            "gap",
            "dmin",
            "rms",
            "seismic_wave",
            "energy"
        ],
        "categorical": ["mag_type", "alert_level"],
        "labels": {}
    }
}


def build_model(algorithm: str, num_classes: int):
    if algorithm == "svm":
        return SVC(
            kernel="rbf",
            probability=True,
            class_weight="balanced",
            C=10.0,
            gamma="scale",
            random_state=42
        )

    if algorithm == "xgboost":
        try:
            from xgboost import XGBClassifier  # pylint: disable=import-error
        except ImportError as exc:
            raise ImportError(
                "XGBoost is required for this prediction. Please install it with "
                "'pip install xgboost'."
            ) from exc

        params = {
            "n_estimators": 400,
            "learning_rate": 0.05,
            "max_depth": 6,
            "subsample": 0.9,
            "colsample_bytree": 0.9,
            "reg_lambda": 1.0,
            "reg_alpha": 0.5,
            "n_jobs": -1,
            "random_state": 42,
            "eval_metric": "logloss"
        }

        if num_classes <= 2:
            params["objective"] = "binary:logistic"
        else:
            params["objective"] = "multi:softprob"
            params["num_class"] = num_classes
            params["eval_metric"] = "mlogloss"

        return XGBClassifier(**params)

    raise ValueError(f"Unsupported algorithm {algorithm}")


def load_pipeline(disaster_key: str):
    model_path = MODEL_DIR / f"{disaster_key}_model.joblib"
    if model_path.exists():
        return joblib.load(model_path)

    config = DATASETS[disaster_key]
    dataset_path = BASE_DIR / config["file"]
    df = pd.read_csv(dataset_path)

    column_map = config["feature_map"]
    features = [column_map[key] for key in column_map]

    X = df[features]
    y = df[config["target"]]
    label_encoder = None

    if y.dtype == object or y.dtype.name == "category":
        label_encoder = LabelEncoder()
        y_train = label_encoder.fit_transform(y)
    else:
        y_train = y

    numeric_columns = [column_map[key] for key in config["numeric"]]
    categorical_columns = [column_map[key] for key in config["categorical"]]

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), numeric_columns),
            ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_columns)
        ]
    )

    num_classes = len(pd.Series(y_train).unique())
    clf = build_model(config["model"], num_classes)

    pipeline = Pipeline(steps=[("prep", preprocessor), ("model", clf)])
    pipeline.fit(X, y_train)

    bundle = {"pipeline": pipeline, "label_encoder": label_encoder}
    joblib.dump(bundle, model_path)
    return bundle


def parse_features(disaster_key: str, payload: dict) -> pd.DataFrame:
    config = DATASETS[disaster_key]
    column_map = config["feature_map"]

    missing = [key for key in column_map if key not in payload]
    if missing:
        raise ValueError(f"Missing required features: {', '.join(missing)}")

    prepared_row = {}
    for api_key, column_name in column_map.items():
        value = payload[api_key]
        if api_key in config["numeric"]:
            prepared_row[column_name] = float(value)
        else:
            prepared_row[column_name] = str(value)

    return pd.DataFrame([prepared_row])


def run_prediction(disaster_key: str, feature_payload: dict) -> dict:
    model_bundle = load_pipeline(disaster_key)
    if hasattr(model_bundle, "predict"):
        bundle = {"pipeline": model_bundle, "label_encoder": None}
    else:
        bundle = model_bundle

    pipeline = bundle["pipeline"]
    label_encoder = bundle.get("label_encoder")
    feature_df = parse_features(disaster_key, feature_payload)

    prediction = pipeline.predict(feature_df)[0]

    if label_encoder is not None:
        decoded_prediction = label_encoder.inverse_transform([int(prediction)])[0]
    else:
        decoded_prediction = prediction

    confidence = None
    if hasattr(pipeline, "predict_proba"):
        proba = pipeline.predict_proba(feature_df)
        confidence = float(proba.max())

    readable_labels = DATASETS[disaster_key].get("labels", {})
    label = readable_labels.get(decoded_prediction, decoded_prediction)

    response = {
        "prediction": label,
        "rawPrediction": decoded_prediction if isinstance(decoded_prediction, (int, float, str)) else str(decoded_prediction)
    }

    if confidence is not None:
        response["confidence"] = round(confidence * 100, 2)

    return response


def main():
    parser = argparse.ArgumentParser(description="Disaster prediction helper")
    parser.add_argument("--disaster", required=True, choices=list(DATASETS.keys()))
    args = parser.parse_args()

    raw_input = sys.stdin.read().strip()
    if not raw_input:
        print("{}", end="")
        sys.exit(1)

    try:
        payload = json.loads(raw_input)
        features = payload["features"]
    except (json.JSONDecodeError, KeyError) as exc:
        print(json.dumps({"error": f"Invalid payload: {exc}"}))
        sys.exit(1)

    try:
        result = run_prediction(args.disaster, features)
        print(json.dumps(result))
    except Exception as exc:  # pylint: disable=broad-except
        print(json.dumps({"error": str(exc)}))
        sys.exit(1)


if __name__ == "__main__":
    main()

