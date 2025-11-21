# VibeSec — AI‑Powered Secure Code Analyzer  
VibeSec is a security tool that analyzes developer‑written or AI‑generated code and identifies potential vulnerabilities using a hybrid **LLM + classifier** architecture.  
The system provides **per‑chunk analysis**, labeling each section as **safe** or **unsafe**, and explaining any detected vulnerabilities.

---

# 🚀 Features

## ✅ Core MVP Features
- Paste code directly into the web UI  
- Send code to backend via REST API  
- Model performs vulnerability analysis  
- Safe/unsafe classification  
- Explanation for unsafe code  
- Fully working end‑to‑end pipeline:
  **Frontend → Backend → Python Model → Results**

## ⭐ Features Beyond MVP
- **Chunk‑based analysis** (handles large codebases)
- **Dual‑model pipeline:**  
  - Custom classifier (CodeBERT + CNN)  
  - Fine‑tuned DeepSeek LoRA model for explanations  
- **Hallucination mitigation:** deterministic generation + output cleaning  
- **Grammarly‑style UI** showing chunk results  
- **Clean explanation formatting & deduplication**  
- **Automatic suppression of explanations for safe code**  
- **Rate limiting & security headers in backend**

---

# 🏗 System Architecture

