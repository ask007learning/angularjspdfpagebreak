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
  }

  setFontType(pdf, type: string = "normal", font: string = "helvetica") {
    pdf.setFont(font, type);
    return pdf;
  }

  splitStringPdf(pdf, txt, indent = "true") {
    const para = pdf.splitTextToSize(indent ? "     " + txt : txt, 175);
    return para;
  }

  buildReport() {
    // const pdf = new jsPDF("p", "mm", [ 595.28,  841.89])
    // const pdf = new jsPDF();
    const pdf = new jsPDF("p", "mm", "legal");
    //this.dustEnglishVersion(pdf);
    //pdf.addPage();
    this.dustSpanishVersion(pdf);
    return pdf;
  }

  dustSpanishVersion(pdf: jsPDF) {
    let marginY = 5;
    let marginX = 35;
    this.setFontType(pdf);
    pdf.setFontSize(11);
    pdf.text("November 4, 2021", marginX, (marginY += 25));
    pdf.text("Owners name:", marginX, (marginY += 10));

    const para1 = this.splitStringPdf(
      pdf,
      `El Departamento de Salud de Douglas y la Agencia de Protección Ambiental visitaron su casa con los propósitos de dar educación sobre la salud y hacer una prueba de polvo de plomo. El polvo colectado en su casa ha sido analizado y los resultados se le están enviado en esta carta.`
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
          "UBICACIÓN DE PRUEBA",
          "NIVEL SEGURO (µg/ft²)",
          "RESULTADO (µg/ft²)",
          "SEGURO/INSEGURO"
        ]
      ],
      body: [
        ["T", "10", "", ""],
        ["W", "10", "", ""],
        ["R", "10", "", ""],
        ["S", "10", "", ""]
      ]
    });

    // debajo de 10 Microgramos por pie cuadrado (μg/ft2) el ser seguro. Las muestras de repisas de ventanas son seguras cuando están debajo de 100 (μg/ft2). (µg/ft²)
    this.setFontType(pdf);
    const para2 = this.splitStringPdf(
      pdf,
      `En general, la Agencia de Protección Ambiental considera cualquier resultado de polvo de piso debajo de 10 microgramos por pie cuadrado (µg/ft²) el ser seguro. Las muestras de ventanas son seguras cuando están debajo de 100 (µg/ft²).`
    );
    pdf.text(marginX, (marginY += 45), para2);

    this.setFontType(pdf, "bold");
    pdf.text("Si todos los resultados son BAJOS:", marginX, (marginY += 20));
    this.setFontType(pdf);
    const para3 = this.splitStringPdf(
      pdf,
      `Todas las muestras de polvo colectadas en su hogar estuvieron debajo de un nivel considerado peligroso para niños de seis años o menores de esta edad.`
    );
    pdf.text(marginX, (marginY += 5), para3);

    this.setFontType(pdf, "bold");
    pdf.text(
      "Si una o más de nuestras muestras del piso es 10 o más:",
      marginX,
      (marginY += 15)
    );
    this.setFontType(pdf);
    const para4 = this.splitStringPdf(
      pdf,
      `Por lo menos una de las muestras del piso de su hogar tuvo un nivel de plomo que se considera inseguro para un niño de seis años de edad o menor de esta edad. El Departamento de Salud del Condado de Douglas ha creado una hoja de datos que incluye consejos para ayudar a reducir la cantidad de plomo en su hogar. El seguir estos consejos ayudara a reducir la cantidad de polvo de plomo en su casa. La copia de la hoja de datos ha sido incluida en esta carta.`
    );
    pdf.text(marginX, (marginY += 5), para4);

    this.setFontType(pdf, "bold");
    pdf.text("Si la repisa de ventana es 100 o más:", marginX, (marginY += 25));
    this.setFontType(pdf);
    const para5 = this.splitStringPdf(
      pdf,
      `El polvo colectado en la repisa de su ventana está a un nivel que se considera peligroso para niños de seis años o menores de esta edad.  Sacuda en húmedo el polvo de su repisa de ventana para reducir la exposición. Adicionalmente, el Departamento de Salud del Condado de Douglas ha creado una hoja de datos que incluye consejos para ayudar a reducir la cantidad de plomo en su hogar. El seguir estos consejos ayudara a reducir la cantidad de polvo de plomo en su casa. La copia de esta hoja de datos ha sido incluida en esta carta.`
    );
    pdf.text(marginX, (marginY += 5), para5);

    this.setFontType(pdf, "bold");
    pdf.text(
      "Si las dos pruebas, de piso y de repisa de ventanas son altas",
      marginX,
      (marginY += 30)
    );
    this.setFontType(pdf);
    const para6 = this.splitStringPdf(
      pdf,
      `El polvo colectado en el piso y  repisa de su ventana está a un nivel que se considera peligroso para niños de seis años o menores de esta edad. El Departamento de Salud del Condado de Douglas ha creado una hoja de datos que incluye consejos para ayudar a reducir la cantidad de plomo en su hogar. La copia de esta hoja de datos ha sido incluida en esta carta.`
    );
    pdf.text(marginX, (marginY += 5), para6);

    const para7 = this.splitStringPdf(
      pdf,
      `El Departamento de Salud del Condado de Douglas tiene un programa activo de prevención de niveles de plomo en la infancia. Este programa está siempre disponible para responder a sus preguntas y ofrecer dirección para la promoción de un ambiente seguro en casa. Nuestro personal puede ser contactado al: (402) 444-7825.`
    );
    pdf.text(marginX, (marginY += 25), para7);

    pdf.addImage(
      "https://raw.githubusercontent.com/ask007learning/angularjspdfpagebreak/master/src/assets/naudiaSignature.jpg",
      "JPEG",
      marginX,
      (marginY += 25),
      80,
      20
    );

    pdf.text("Naudia McCracken, MPH", marginX, (marginY += 25));
    pdf.text("Acting Program Supervisor", marginX, (marginY += 5));
    pdf.text(
      "Childhood Lead Poisoning Prevention Program",
      marginX,
      (marginY += 5)
    );
    pdf.text("Division of Environmental Health", marginX, (marginY += 5));
    return pdf;
  }

  dustEnglishVersion(pdf: jsPDF) {
    let marginY = 5;
    let marginX = 35;
    // console.log(pdf.getFontList());
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
  }

  htmltoPDF() {
    const pdf = this.buildReport();
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
    const pdf = this.buildReport();
    pdf.save("file.pdf");
  }

  viewInTab() {
    const pdf = this.buildReport();
    window.open(pdf.output("bloburl"), "_blank");
  }
}
