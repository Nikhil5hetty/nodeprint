const express = require("express");
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const cors = require("cors");
const port = 3010;
const app = express();
app.use(cors());
app.use(express.json());

const server = app.listen(port);
let io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3001", "https://my-app-93a57.web.app"],
  },
});

io.on("connection", (socket) => {
  console.log("ddd");
  console.log(socket.id);
  //   socket.emit("request" /* … */); // emit an event to the socket
  //   io.emit("broadcast" /* … */); // emit an event to all connected sockets
  socket.on("print", async (data) => {
    console.log(data);
    const p = await print();
    console.log("n");
    /* … */
  }); // listen to the event
});

let printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: "tcp://192.168.1.19",
});

async function print() {
  let isConnected = await printer.isPrinterConnected();

  if (isConnected) {
    console.log(isConnected);
    printer.clear();
    printer.setTypeFontA();
    printer.alignCenter();
    printer.setTextSize(1, 1);
    printer.bold(true);
    printer.println("type");
    printer.bold(false);
    printer.setTextNormal();
    printer.println("(" + "hotel" + ")");
    printer.setTypeFontA();
    printer.setTextSize(1, 1);
    printer.println("Table NO:-" + "12");

    printer.setTextNormal();

    printer.tableCustom([
      // Prints table with custom settings (text, align, width, cols, bold)
      { text: "" + "getDate()" + "", align: "LEFT" },
      { text: "" + "getTime()" + "", align: "RIGHT" },
    ]);

    printer.tableCustom([
      // Prints table with custom settings (text, align, width, cols, bold)
      { text: "KOT Number  : " + "kotNo" + "", align: "LEFT" },
      { text: "Waiter Name : " + "waiter" + "", align: "RIGHT" },
    ]);
    printer.drawLine();

    printer.drawLine();
    printer.cut();

    try {
      console.log("try");
      let execute = await printer.execute();
      console.log("******");
      console.log(execute);
      retValue = 1;
    } catch (error) {
      retValue = -1;
      console.log("Print failed:", error);
    }
  } else console.log("not connected");
}

app.post("/", (req, res) => {
  //console.log(req.params);
  console.log(req.body);
  //print();
  //console.log(req.headers);

  res.send("Hello World!");
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
