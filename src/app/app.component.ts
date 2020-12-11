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
    this.htmltoPDF();
    // this.generatePdfFromCode();
  }

  setFontType(pdf, type: string = "normal", font: string = "helvetica") {
    pdf.setFont(font, type);
    return pdf;
  }

  splitStringPdf(pdf, txt, indent = "true") {
    const para = pdf.splitTextToSize(indent ? "     " + txt : txt, 175);
    return para;
  }

  generatePdfFromCode() {
    let marginY = 5;
    let marginX = 35;
    const pdf = new jsPDF("p", "mm", "legal");
    // const pdf = new jsPDF("p", "mm", [ 595.28,  841.89])
    // const pdf = new jsPDF();
    console.log(pdf.getFontList());

    this.setFontType(pdf);

    pdf.addImage(
      "https://raw.githubusercontent.com/ask007learning/angularjspdfpagebreak/master/src/assets/dustLogoTop.jpg",
      "JPEG",
      marginX,
      marginY,
      160,
      25
    );

    pdf.addImage(
      "https://raw.githubusercontent.com/ask007learning/angularjspdfpagebreak/master/src/assets/dustLogoSide2.jpg",
      "JPEG",
      5,
      marginY + 30,
      25,
      210
    );

    //Header
    // pdf.setFontSize(14);
    // pdf.text(
    //   "To Protect, Promote, and Prioritize the Health of our Entire Community",
    //   marginX,
    //   marginY
    // );

    pdf.setFontSize(11);
    pdf.text("November 4, 2021", marginX, (marginY += 35));
    pdf.text("Dear Owner name,", marginX, (marginY += 10));

    const para1 = this.splitStringPdf(
      pdf,
      `The Douglas County Health Department and the Environmental Protection Agency visited your home for the purposes of health education and house dust sampling on Date of Sampling. Dust collected from your home has been analyzed and the results are being sent to you in this letter.`
    );
    pdf.text(marginX, (marginY += 10), para1);

    this.setFontType(pdf, "bold");
    pdf.text(
      "Street Address/Said-Resident ID: Date of Sampling",
      marginX,
      (marginY += 20)
    );

    pdf.autoTable({
      theme: "grid",
      headStyles: { fillColor: [74, 112, 144] },
      margin: { left: marginX, top: marginY += 3 },
      head: [
        [
          "SAMPLE LOCATION",
          "SAFE LEVEL (µg/ft²)",
          "RESULTS (µg/ft²)",
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

    this.setFontType(pdf);
    const para2 = this.splitStringPdf(
      pdf,
      `In general, EPA considers any floor dust results below 10 micrograms per square foot (µg/ft²) to be safe. Windowsill samples are safe when they are below 100 (µg/ft²).`
    );
    pdf.text(marginX, (marginY += 45), para2);

    this.setFontType(pdf, "bold");
    pdf.text("If all results are LOW", marginX, (marginY += 15));
    this.setFontType(pdf);
    const para3 = this.splitStringPdf(
      pdf,
      `All of the dust samples collected from your home were below a level considered hazardous to children seven years of age or younger.`
    );
    pdf.text(marginX, (marginY += 5), para3);

    this.setFontType(pdf, "bold");
    pdf.text(
      "If one or more of the floor samples is 10 or more:",
      marginX,
      (marginY += 15)
    );
    this.setFontType(pdf);
    const para4 = this.splitStringPdf(
      pdf,
      `At least one of the samples from the floor of your home had a lead level that would be considered unsafe for children seven years of age or younger. The Douglas County Health Department has developed a Fact Sheet which includes tips that will help reduce the amount of lead in your home. Following these tips will help reduce the amount of lead dust in your house. A copy of this fact sheet is enclosed with this letter.`
    );
    pdf.text(marginX, (marginY += 5), para4);

    this.setFontType(pdf, "bold");
    pdf.text(
      "If the windowsill sample is 100 or greater:",
      marginX,
      (marginY += 25)
    );
    this.setFontType(pdf);
    const para5 = this.splitStringPdf(
      pdf,
      `The dust collected from your windowsill is at a level that would be considered hazardous to children seven years of age or younger. Wipe dust off windowsills often to reduce human exposure. In addition, the Douglas County Health Department has developed a Fact Sheet which includes tips that will help reduce the amount of lead in your home. Following these tips will reduce the amount of lead tracked into your home. A copy of this fact sheet is enclosed with this letter.`
    );
    pdf.text(marginX, (marginY += 5), para5);

    this.setFontType(pdf, "bold");
    pdf.text(
      "If both floor and windowsill samples are high:",
      marginX,
      (marginY += 30)
    );
    this.setFontType(pdf);
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

    return pdf;

    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "style",
      "position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;"
    );
    document.body.appendChild(iframe);
    iframe.src = pdf.output("datauristring");
  }

  htmltoPDF() {
    const pdf = this.generatePdfFromCode();
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
    const pdf = this.generatePdfFromCode();
    pdf.save("file.pdf");
  }

  viewInTab() {
    const pdf = this.generatePdfFromCode();
    window.open(pdf.output("bloburl"), "_blank");
  }
}
