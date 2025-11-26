const express = require("express");
const path = require("path");
const { spawn } = require("child_process");

const router = express.Router();

router.post("/", (req, res) => {
    const { disasterType, features } = req.body || {};

    if (!disasterType || typeof features !== "object") {
        return res.status(400).json({
            message: "disasterType and features are required in the request body."
        });
    }

    const normalizedType = String(disasterType).toLowerCase();
    const supported = ["flood", "landslide", "tsunami", "earthquake"];

    if (!supported.includes(normalizedType)) {
        return res.status(400).json({
            message: `Unsupported disaster type. Use one of: ${supported.join(", ")}.`
        });
    }

    const scriptPath = path.resolve(__dirname, "../../Capstone-main/predict_disaster.py");
    const pythonProcess = spawn("python", [scriptPath, "--disaster", normalizedType], {
        cwd: path.dirname(scriptPath)
    });

    let stdout = "";
    let stderr = "";

    pythonProcess.stdout.on("data", chunk => {
        stdout += chunk.toString();
    });

    pythonProcess.stderr.on("data", chunk => {
        stderr += chunk.toString();
    });

    pythonProcess.on("error", error => {
        console.error("Failed to start prediction process:", error);
        return res.status(500).json({
            message: "Unable to start prediction pipeline.",
            error: error.message
        });
    });

    pythonProcess.on("close", code => {
        if (code !== 0) {
            const errorOutput = stderr || stdout || "Unknown error";
            console.error("Prediction script error:", errorOutput);

            try {
                const parsed = JSON.parse(errorOutput);
                return res.status(500).json({
                    message: parsed.error || "Prediction pipeline failed.",
                    error: parsed
                });
            } catch (_err) {
                return res.status(500).json({
                    message: "Prediction pipeline failed.",
                    error: errorOutput
                });
            }
        }

        try {
            const payload = JSON.parse(stdout);
            return res.json(payload);
        } catch (parseError) {
            console.error("Failed to parse prediction output:", parseError);
            return res.status(500).json({
                message: "Invalid prediction payload.",
                error: parseError.message
            });
        }
    });

    pythonProcess.stdin.write(JSON.stringify({ features }));
    pythonProcess.stdin.end();
});

module.exports = router;

