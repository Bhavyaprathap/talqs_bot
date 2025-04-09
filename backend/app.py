from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from io import BytesIO
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import inch
from reportlab.lib import colors
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Initialize QA pipeline
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

# Sample context (can be dynamic later)
LEGAL_CONTEXT = """
A contract is a legally binding agreement between two or more parties that is enforceable by law. 
In order for a contract to be valid, it must contain an offer, acceptance, consideration, and the intention to create legal relations.
"""

# ----------- NDA PDF GENERATION -----------
@app.route("/generate_nda_pdf", methods=["POST"])
def generate_nda_pdf():
    data = request.get_json()
    disclosing_party = data.get("disclosingParty", "")
    receiving_party = data.get("receivingParty", "")
    date = data.get("date", "")
    purpose = data.get("purpose", "")

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=LETTER, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=72)

    styles = getSampleStyleSheet()
    normal = styles["Normal"]
    bold_center = ParagraphStyle(name="BoldCenter", parent=styles["Heading1"], alignment=TA_CENTER)
    section_header = ParagraphStyle(name="SectionHeader", fontSize=12, leading=14, spaceAfter=6, spaceBefore=12, fontName="Helvetica-Bold")
    indent = ParagraphStyle(name="Indented", parent=normal, leftIndent=20)

    elements = []

    elements.append(Paragraph("NON-DISCLOSURE AGREEMENT", bold_center))
    elements.append(Spacer(1, 12))

    def add_section(title, bullets):
        elements.append(Paragraph(title, section_header))
        for bullet in bullets:
            elements.append(Paragraph("• " + bullet, indent))

    add_section("PARTIES", [
        f"This Non-Disclosure Agreement is entered into on {date}, by and between {disclosing_party} and {receiving_party}."
    ])
    add_section("CONFIDENTIAL INFORMATION", [
        "The Receiving Party agrees not to disclose or misuse any confidential information.",
        "Confidential information includes business processes, client details, and any proprietary data."
    ])
    add_section("RETURN OF CONFIDENTIAL INFORMATION", [
        "All confidential information must be returned upon agreement termination."
    ])
    add_section("OWNERSHIP", [
        "This Agreement is non-transferable without written consent."
    ])
    add_section("GOVERNING LAW", [
        "This Agreement is governed by the applicable jurisdiction."
    ])
    add_section("SIGNATURE AND DATE", [
        f"Disclosing Party: _______________________      Date: {date}",
        f"Receiving Party: _______________________      Date: {date}"
    ])

    def draw_border(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(colors.blue)
        canvas.setLineWidth(3)
        canvas.rect(40, 40, doc.width + 64, doc.height + 64)
        canvas.restoreState()

    doc.build(elements, onFirstPage=draw_border, onLaterPages=draw_border)
    buffer.seek(0)

    return send_file(buffer, as_attachment=True, download_name="NDA_Document.pdf", mimetype="application/pdf")


# ----------- LEGAL QA ENDPOINT -----------
@app.route("/ask", methods=["POST"])
def ask_question():
    data = request.get_json()
    question = data.get("question", "")

    if not question:
        return jsonify({"answer": "⚠️ Please provide a question."}), 400

    try:
        result = qa_pipeline(question=question, context=LEGAL_CONTEXT)
        return jsonify({"answer": result["answer"]})
    except Exception as e:
        return jsonify({"answer": f"❌ Error: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
