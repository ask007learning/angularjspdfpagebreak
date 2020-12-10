import { Component, OnInit } from "@angular/core";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550
  };
  paragraphs$: Observable<any[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.paragraphs$ = this.http.get<any[]>(
    //   "https://jsonplaceholder.typicode.com/comments"
    // );
    // this.htmltoPDF();
    this.generatePdfFromCode();
  }

  generatePdfFromCode() {
    let marginY = 20;
    let marginX = 10;
    const pdf = new jsPDF();

    //Header
    // pdf.setFontSize(14);
    // pdf.text(
    //   "To Protect, Promote, and Prioritize the Health of our Entire Community",
    //   marginX,
    //   marginY
    // );

    pdf.setFontSize(12);
    pdf.text("November 4, 2020", marginX, marginY);
    pdf.text("Dear Owner name,", marginX, (marginY += 10));

    const para1 = this.splitStringPdf(
      pdf,
      `The Douglas County Health Department and the Environmental Protection Agency visited your home for the purposes of health education and house dust sampling on Date of Sampling. Dust collected from your home has been analyzed and the results are being sent to you in this letter.`
    );
    pdf.text(marginX, (marginY += 10), para1);

    pdf.setFontType("bold");
    pdf.text(
      "Street Address/Said-Resident ID: Date of Sampling",
      marginX,
      (marginY += 20)
    );

    pdf.autoTable({
      margin: { left: marginX, top: marginY += 3 },
      head: [
        [
          "SAMPLE LOCATION",
          "SAFE LEVEL (ug/ft2)",
          "RESULTS (ug/ft2)",
          "SAFE/UNSAFE"
        ]
      ],
      body: [
        ["T", "10", "", ""],
        ["W", "10", "", ""],
        ["R", "10", "", ""],
        ["S", "10", "", ""]
      ]
    });

    pdf.setFontType("normal");
    const para2 = this.splitStringPdf(
      pdf,
      `In general, EPA considers any floor dust results below 10 micrograms per square foot (ug/ft2) to be safe. Windowsill samples are safe when they are below 100 (ug/ft2).`
    );
    pdf.text(marginX, (marginY += 45), para2);

    pdf.setFontType("bold");
    pdf.text("If all results are LOW", marginX, (marginY += 15));
    pdf.setFontType("normal");
    const para3 = this.splitStringPdf(
      pdf,
      `All of the dust samples collected from your home were below a level considered hazardous to children seven years of age or younger.`
    );
    pdf.text(marginX, (marginY += 5), para3);

    pdf.setFontType("bold");
    pdf.text(
      "If one or more of the floor samples is 10 or more:",
      marginX,
      (marginY += 15)
    );
    pdf.setFontType("normal");
    const para4 = this.splitStringPdf(
      pdf,
      `At least one of the samples from the floor of your home had a lead level that would be considered unsafe for children seven years of age or younger. The Douglas County Health Department has developed a Fact Sheet which includes tips that will help reduce the amount of lead in your home. Following these tips will help reduce the amount of lead dust in your house. A copy of this fact sheet is enclosed with this letter.`
    );
    pdf.text(marginX, (marginY += 5), para4);

    pdf.setFontType("bold");
    pdf.text(
      "If the windowsill sample is 100 or greater:",
      marginX,
      (marginY += 30)
    );
    pdf.setFontType("normal");
    const para5 = this.splitStringPdf(
      pdf,
      `The dust collected from your windowsill is at a level that would be considered hazardous to children seven years of age or younger. Wipe dust off windowsills often to reduce human exposure. In addition, the Douglas County Health Department has developed a Fact Sheet which includes tips that will help reduce the amount of lead in your home. Following these tips will reduce the amount of lead tracked into your home. A copy of this fact sheet is enclosed with this letter.`
    );
    pdf.text(marginX, (marginY += 5), para5);

    pdf.setFontType("bold");
    pdf.text(
      "If both floor and windowsill samples are high:",
      marginX,
      (marginY += 30)
    );
    pdf.setFontType("normal");
    const para6 = this.splitStringPdf(
      pdf,
      `The dust collected from your floor and windowsill are at levels that would be considered hazardous to children seven years of age or younger. The Douglas County Health Department has developed a Fact Sheet which includes tips that will help reduce the lead in your home. A copy of this fact sheet is enclosed with this letter.`
    );
    pdf.text(marginX, (marginY += 5), para6);

    const para7 = this.splitStringPdf(
      pdf,
      `The Douglas County Health Department has an active childhood blood lead prevention program. It is always available to answer questions and offer advice on promoting a lead safe home environment. Our staff can be reached at (402) 444-7825.`
    );
    pdf.text(marginX, (marginY += 25), para7);

    pdf.text("Naudia McCracken, MPH", marginX, (marginY += 25));
    pdf.text("Acting Program Supervisor", marginX, (marginY += 5));
    pdf.text(
      "Childhood Lead Poisoning Prevention Program",
      marginX,
      (marginY += 5)
    );
    pdf.text("Division of Environmental Health", marginX, (marginY += 5));

    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "style",
      "position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;"
    );
    document.body.appendChild(iframe);
    iframe.src = pdf.output("datauristring");
  }

  splitStringPdf(pdf, txt) {
    const para = pdf.splitTextToSize(txt, 190);
    return para;
  }

  htmltoPDF(margins = this.margins) {
    const pdf = this.generatePdf(margins);
    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "style",
      "position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;"
    );
    document.body.appendChild(iframe);
    iframe.src = pdf.output("datauristring");
  }

  downloadPDF(margins = this.margins) {
    // content is the html element which has to be converted to PDF
    const pdf = this.generatePdf(margins);
    pdf.save("file.pdf");
  }

  generatePdf(margins = this.margins) {
    const pdf = new jsPDF("p", "pt", "a4");
    pdf.setFontSize(18);
    pdf.fromHTML(
      document.getElementById("content"),
      margins.left, // x coordinate
      margins.top,
      {
        // y coordinate
        width: margins.width // max width of content on PDF
      },
      dispose => {
        // this.headerFooterFormatting(pdf, pdf.internal.getNumberOfPages());
      },
      margins
    );
    return pdf;
  }

  buildReport() {
    const pdf = new jsPDF();
  }

  headerFooterFormatting(doc, totalPages) {
    for (let i = totalPages; i >= 1; i--) {
      doc.setPage(i);
      // add header
      this.header(doc);

      // add page number to footer
      this.footer(doc, i, totalPages);
      doc.page++;
    }
  }

  header(doc, margins = this.margins) {
    doc.setFontSize(30);
    doc.setTextColor(40);
    doc.setFontStyle("normal");

    doc.text("Header Template", margins.left + 50, 40);
    doc.setLineCap(2);
    // doc.line(3, 70, margins.width + 43, 70); // horizontal line
  }

  footer(doc, pageNumber, totalPages, margins = this.margins) {
    const str = "Page " + pageNumber + " of " + totalPages + " By Leonel E.";

    doc.setFontSize(10);
    doc.text(str, margins.left, doc.internal.pageSize.height - 20);
  }
}
