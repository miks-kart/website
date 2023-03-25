import { PDFViewer } from "@react-pdf/renderer";
import PDF from "./PDF";

export default function PDFTest({ data, shoppingCart, pdf, dzhunior, sport }) {
  return (
    <>
      {typeof window !== "undefined" && (
        <PDFViewer className="w-full h-screen ">
          <PDF
            dzhunior={dzhunior}
            sport={sport}
            shoppingCart={shoppingCart}
            name={"Ceny"}
            data={data}
            pdf={pdf}
          />
        </PDFViewer>
      )}
    </>
  );
}
