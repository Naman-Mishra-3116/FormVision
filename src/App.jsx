import React, { useState } from "react";
import Card from "./components/Card";
import textImage from "./assets/text.png";
import Invoice from "./components/Invoice";
import Receipt from "./components/Receipt";

const App = () => {
  const [selected, setSelected] = useState("");

  const handleIClick = () => {
    setSelected("invoice");
  };

  const handleRClick = () => {
    setSelected("receipt");
  };

  const handleGoBack = () => {
    setSelected("");
  };

  if (selected === "invoice") {
    return <Invoice goBack={handleGoBack} />;
  }

  if (selected === "receipt") {
    return <Receipt goBack={handleGoBack} />;
  }

  return (
    <>
      <h2 className="text-4xl text-white text-center mt-[11rem]">
        FormVision AI - Invoice and Receipt Data Extractor
      </h2>

      <div className="flex justify-center mt-10 h-screen">
        <div className="flex gap-10">
          <Card
            title={"Invoice"}
            onClickCard={handleIClick}
            image={textImage}
            altText={"Invoice"}
          />

          <Card
            title={"Receipt"}
            onClickCard={handleRClick}
            image={textImage}
            altText={"logo showing speech to text"}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(App);
