import Dropzone from "./DropZone";
import { useState } from "react";
import { Flex, Loader } from "@mantine/core";
import FButton from "./FButton";
import {
  DocumentAnalysisClient,
  AzureKeyCredential,
} from "@azure/ai-form-recognizer";
const endpoint = import.meta.env.VITE_ENDPOINT;
const apiKey = import.meta.env.VITE_KEY;

const Invoice = ({ goBack }) => {
  const [image, setImage] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeInvoice = async () => {
    if (!image) return;

    setLoading(true);

    const client = new DocumentAnalysisClient(
      endpoint,
      new AzureKeyCredential(apiKey)
    );

    const fileArrayBuffer = await image.arrayBuffer();
    const poller = await client.beginAnalyzeDocument(
      "prebuilt-invoice",
      fileArrayBuffer
    );

    const result = await poller.pollUntilDone();

    if (result) {
      const { documents } = result;
      const fields = documents[0].fields;
      setLoading(false);
      setInvoiceData(fields);
    } else {
      alert("No data extracted");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-[800px] ml-[auto] mr-[auto] mt-[100px]">
      <h2 className="text-2xl text-white text-center font-bold">Upload Invoice</h2>
      <Dropzone setImage={setImage} />
      {image && (
        <h2 className="text-xl text-white text-center">
          Receipt is already uploaded
        </h2>
      )}

      <Flex mt={"lg"} gap={"lg"} style={{ zIndex: "100" }}>
        <FButton fn={goBack}>Go Back</FButton>
        <FButton fn={analyzeInvoice}>
          {loading ? <Loader color="white" /> : "Extract Data"}
        </FButton>
        <FButton
          fn={() => {
            setImage(null);
            setInvoiceData(null);
          }}
        >
          Clear
        </FButton>
      </Flex>

      {invoiceData && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Extracted Data:</h2>
          <div className="space-y-6">
            {invoiceData.Items && (
              <div>
                <h3 className="text-lg font-medium mb-2">Items:</h3>
                {invoiceData.Items.values && (
                  <table className="w-full border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border border-gray-300">Amount</th>
                        <th className="p-2 border border-gray-300">
                          Description
                        </th>
                        <th className="p-2 border border-gray-300">Quantity</th>
                        <th className="p-2 border border-gray-300">
                          Unit Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.Items.values.map((item, index) => (
                        <tr key={index} className="text-center">
                          <td className="p-2 border border-gray-300">
                            {item.properties.Amount?.content}
                          </td>
                          <td className="p-2 border border-gray-300">
                            {item.properties.Description?.content}
                          </td>
                          <td className="p-2 border border-gray-300">
                            {item.properties.Quantity?.content}
                          </td>
                          <td className="p-2 border border-gray-300">
                            {item.properties.UnitPrice?.content}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
            {invoiceData.BillingAddress && (
              <div>
                <h3 className="text-lg font-medium mb-1">Billing Address:</h3>
                <p className="text-gray-700">
                  {invoiceData.BillingAddress.content}
                </p>
              </div>
            )}
            {invoiceData.BillingAddressRecipient && (
              <div>
                <h3 className="text-lg font-medium mb-1">
                  Billing Address Recipient:
                </h3>
                <p className="text-gray-700">
                  {invoiceData.BillingAddressRecipient.content}
                </p>
              </div>
            )}
            {invoiceData.CustomerName && (
              <div>
                <h3 className="text-lg font-medium mb-1">Customer Name:</h3>
                <p className="text-gray-700">
                  {invoiceData.CustomerName.content}
                </p>
              </div>
            )}
            {invoiceData.InvoiceDate && (
              <div>
                <h3 className="text-lg font-medium mb-1">Invoice Date:</h3>
                <p className="text-gray-700">
                  {invoiceData.InvoiceDate.content}
                </p>
              </div>
            )}
            {invoiceData.InvoiceId && (
              <div>
                <h3 className="text-lg font-medium mb-1">Invoice ID:</h3>
                <p className="text-gray-700">{invoiceData.InvoiceId.content}</p>
              </div>
            )}
            {invoiceData.InvoiceTotal && (
              <div>
                <h3 className="text-lg font-medium mb-1">Invoice Total:</h3>
                <p className="text-gray-700">
                  {invoiceData.InvoiceTotal.content}
                </p>
              </div>
            )}
            {invoiceData.VendorAddress && (
              <div>
                <h3 className="text-lg font-medium mb-1">Vendor Address:</h3>
                <p className="text-gray-700">
                  {invoiceData.VendorAddress.content}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
