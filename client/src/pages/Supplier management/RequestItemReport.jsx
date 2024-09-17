import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RequestItemReport = ({ filteredRequestItems }) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        const tableColumn = [
            "No",
            "Request ID",
            "Supplier Name",
            "Item Name",
            "Quantity",
            "Request Date",
            "Status"
        ];
        const tableRows = [];

        filteredRequestItems.forEach((item, index) => {
            const data = [
                index + 1,
                item.requestID,
                item.supplierName,
                item.itemName,
                item.quantity,
                new Date(item.requestDate).toLocaleDateString(),
                item.status
            ];
            tableRows.push(data);
        });

        const date = new Date().toLocaleDateString();

        doc.setFontSize(24).setFont("helvetica", "bold").setTextColor("#4B9CD3");
        doc.text("Vehicle_Service Management", 105, 15, { align: "center" });

        doc.setFont("helvetica", "normal").setFontSize(18).setTextColor("#333");
        doc.text("Request Item Details Report", 105, 25, { align: "center" });

        doc.setFont("helvetica", "italic").setFontSize(12).setTextColor("#666");
        doc.text(`Report Generated Date: ${date}`, 105, 35, { align: "center" });

        doc.setFont("helvetica", "normal").setFontSize(10).setTextColor("#999");
        doc.text(
            "Service, Gampaha",
            105,
            45,
            { align: "center" }
        );

        doc.setDrawColor(0, 0, 0).setLineWidth(0.5);
        doc.line(10, 49, 200, 49);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 55,
            styles: { fontSize: 10, cellPadding: 2 },
            headStyles: {
                fillColor: [44, 62, 80],
                textColor: [255, 255, 255],
                fontStyle: "bold",
                halign: 'center'
            },
            alternateRowStyles: {
                fillColor: [230, 230, 230]
            },
            margin: { top: 60 }
        });

        doc.save(`Request-Items-Report_${date}.pdf`);

        // Optionally, you can also send an email alert like in the Supplier Report
        // const emailSubject = encodeURIComponent('Request Items Report Generated');
        // const emailBody = encodeURIComponent(`Dear Manager,\n\nThe request items report has been generated.\n\nBest regards,\nYour Company`);
        // const emailRecipient = encodeURIComponent('manager@gmail.com');
        // const mailtoLink = `mailto:${emailRecipient}?subject=${emailSubject}&body=${emailBody}`;
        
        // window.location.href = mailtoLink;
    };

    return (
        <button onClick={generatePDF} className='btn2' style={{ backgroundColor: '#4B9CD3', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Generate Report
        </button>
    );
};

export default RequestItemReport;
