import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const data = [
    {
      status: 200,
      message: "unliked user data",
      data: {
        userTradeData: [
          {
            date: "5/27/2024",
            data: [
              {
                index: "FINNIFTY24MAY18500PE",
                transaction_type: "SELL",
                reason:
                  "Markets are closed right now. Try placing an after market order (AMO). [Read more.](https://support.zerodha.com/category/trading-and-markets/kite-web-and-mobile/articles/what-is-amo-and-when-can-we-place-it)",
                linkTime: "21:38:00",
                unlinkTime: "14:33:55",
              },
              {
                index: "FINNIFTY24MAY18500PE",
                transaction_type: "SELL",
                linkTime: "21:38:00",
                unlinkTime: "14:33:55",
              },
            ],
          },
          {
            date: "6/13/2024",
            data: [
              {
                index: "SENSEX24JUN77500CE",
                transaction_type: "SELL",
                reason: "Incorrect api_key or access_token.",
                linkTime: "10:25:19",
                unlinkTime: "18:53:01",
              },
            ],
          },
        ],
        code: 1,
        user_name: "Hardik Akbari",
        totalNumberOfRecord: 8,
        numberOfRecord: 2,
      },
      error: {},
    },
  ];

  const response = data[0].data.userTradeData;

  console.log(response);

  const handleDownload = () => {
    const input = document.getElementById("mainBox");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF("p", "mm", "a4");
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("download.pdf");
    });
  };

  return (
    <>
      <div className="main_trading">
        <div className="main_btn">
          <button onClick={handleDownload} className="btn">
            Download PDF
          </button>
        </div>

        <div className="main_box_trading" id="mainBox">
          <div className="main_field_trading">
            <p>Sr No</p>
            <p>Date</p>
            <p>Linked Time</p>
            <p>Unlinked Time</p>
            <p>Index</p>
            <p>Buy/Sell</p>
            <p>Reason</p>
          </div>
          {response.map((res, outerIndex) =>
            res.data.map((innerRes, innerIndex) => (
              <div
                key={`${outerIndex}-${innerIndex}`}
                className="fields_value_trading"
              >
                <p>
                  {outerIndex + 1}-{innerIndex + 1}
                </p>
                <p>{res.date}</p>
                <p>{innerRes.linkTime}</p>
                <p>{innerRes.unlinkTime}</p>
                <p>{innerRes.index}</p>
                <p>{innerRes.transaction_type}</p>
                <p>{"not executed"}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
