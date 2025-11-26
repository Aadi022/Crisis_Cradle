# Capstone
# Disaster Prediction Capstone Project

## Project Workflow

The overall workflow for predicting disasters (Flood, Landslide, Tsunami, Earthquake) is as follows:

1. **Data Preprocessing**
   - Handle missing values by filling NAs using appropriate methods (mean, medianon the column type).

2. **Label Encoding**
   - Convert categorical variables into numerical values using label encoding to make them suitable for machine learning models.

3. **Train-Test Split and Validation**
   - We split the dataset into **80% training+validation** and **20% testing**.  
   - Within the training set, **10% is used as a validation set** to monitor the model during training.

4. **Implement Machine Learning Models**
   - **XGBoost Classifier**  
   - **Support Vector Machine (SVM)**  
   - **Feedforward Neural Network (FNN / MLPClassifier)**  

5. **Hyperparameter Tuning**
   - Hyperparameter tuning is performed using **Randomized Search** with **3-fold cross-validation** on the training set to optimize model parameters.  
   - This approach helps to **avoid overfitting** and ensures **robust model performance**.

6. **Model Evaluation**
   - Evaluate the models using **classification report metrics**: Accuracy, Precision, Recall, and F1-Score.
  

> **Summary**  
> “We split the dataset into 80% training+validation and 20% testing. A small portion of the training data is used as a validation set. Hyperparameter tuning is performed using randomized search with 3-fold cross-validation to optimize model parameters.”

---

## Model Performance

### Flood Prediction

| Model   | Accuracy | Precision | Recall  | F1-Score |
|:--------|:--------|:---------|:-------|:---------|
| XGBoost | 0.9585  | 0.960    | 0.960  | 0.960    |
| SVM     | 0.9595  | 0.500    | 0.491  | 0.496    |
| FNN     | 0.9480  | 0.947    | 0.951  | 0.949    |

### Tsunami Prediction

| Model   | Accuracy | Precision | Recall  | F1-Score |
|:--------|:--------|:---------|:-------|:---------|
| XGBoost | 0.9236  | 0.947    | 0.918  | 0.903    |
| SVM     | 0.8981  | 0.944    | 0.918  | 0.875    |
| FNN     | 0.8917  | 0.944    | 0.918  | 0.868    |

### Earthquake Prediction

| Model   | Accuracy | Precision | Recall  | F1-Score |
|:--------|:--------|:---------|:-------|:---------|
| XGBoost | 0.959   | 0.96     | 0.96   | 0.96     |
| SVM     | 0.958   | 0.96     | 0.96   | 0.96     |
| FNN     | 0.9285  | 0.93     | 0.925  | 0.93     |

### Landslide Prediction

| Model   | Accuracy | Precision | Recall  | F1-Score |
|:--------|:--------|:---------|:-------|:---------|
| XGBoost | 0.9452  | 0.947    | 0.947  | 0.947    |
| SVM     | 0.9452  | 0.947    | 0.947  | 0.947    |
| FNN     | 0.9401  | 0.943    | 0.942  | 0.943    |

---

