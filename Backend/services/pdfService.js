const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const extractPdfText = async (filePath) => {
    let parser;
    try {
        const dataBuffer = fs.readFileSync(filePath);
        parser = new PDFParse({ data: dataBuffer });
        const result = await parser.getText();
        return result && result.text ? result.text : '';
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw error;
    } finally {
        if (parser && typeof parser.destroy === 'function') {
            try { await parser.destroy(); } catch (e) { /* ignore */ }
        }
    }
};

module.exports = {
    extractPdfText,
};