const express = require("express");
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const cors = require("cors");
const port = 3010;
const app = express();
const moment = require("moment");
app.use(cors());
app.use(express.json());

const server = app.listen(port);
let io = require("socket.io")(server, {
  cors: {
    origin: ["*", "http://localhost:3000", "https://my-app-93a57.web.app"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  //   socket.emit("request" /* … */); // emit an event to the socket
  //   io.emit("broadcast" /* … */); // emit an event to all connected sockets
  socket.on("print", async (data) => {
    console.log(data);
    // const p = await print();
    console.log(socket.id);
    try {
      await printBill(data);
      socket.emit("printBillSuccess", "data");
    } catch {
      console.log("Print failed from server side");
      socket.emit("printBillFail", "data");
    }

    /* … */
  }); // listen to the event
});

let printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: "tcp://192.168.1.19",
});

async function print(data) {
  //const datetime = new Date().toISOString();
  const date = moment().format("MM-DD-YYYY");
  const time = moment().format("HH:mm:ss");
  let isConnected = await printer.isPrinterConnected();
  const { type, tableno, waiter, number, items } = data;
  if (isConnected) {
    console.log(isConnected);
    printer.clear();
    printer.setTypeFontA();
    printer.alignCenter();
    printer.setTextSize(1, 1);
    printer.bold(true);
    printer.println(type);
    printer.bold(false);
    printer.setTextNormal();
    //printer.println("(" + "hotel" + ")");
    printer.setTypeFontA();
    printer.setTextSize(1, 1);
    printer.println("Table NO:-" + tableno);

    printer.setTextNormal();

    printer.tableCustom([
      // Prints table with custom settings (text, align, width, cols, bold)
      { text: "DATE: " + date + "", align: "LEFT" },
      { text: "TIME: " + time + "", align: "RIGHT" },
    ]);

    printer.tableCustom([
      // Prints table with custom settings (text, align, width, cols, bold)
      { text: "KOT # : " + number + "", align: "LEFT" },
      { text: "W.Name: " + waiter + "", align: "RIGHT" },
    ]);
    printer.drawLine();
    items.forEach((item) => {
      printer.tableCustom([
        // Prints table with custom settings (text, align, width, cols, bold)
        {
          text: item.type ? item.name + " [P]" : item.name,
          align: "LEFT",
        },
        { text: item.qty, align: "RIGHT" },
      ]);

      // printer.tableCustom([
      //   // Prints table with custom settings (text, align, width, cols, bold)
      //   { text: "Item Name", align: "LEFT", width: 0.5 },
      //   { text: "Qty", align: "RIGHT", width: 0.15 },
      //   { text: "Price", align: "RIGHT", width: 0.15 },
      //   { text: "Price", align: "CENTER", width: 0.2 },
      // ]);
    });
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
  } else throw console.log("not connected");
}

async function printBill(data) {
  //const datetime = new Date().toISOString();
  const date = moment().format("MM-DD-YYYY");
  const time = moment().format("HH:mm:ss");
  let isConnected = await printer.isPrinterConnected();
  const { type, tableno, waiter, number, items } = data;
  if (isConnected) {
    console.log(isConnected);
    printer.clear();
    printer.setTypeFontA();
    printer.alignCenter();
    printer.setTextSize(1, 1);
    printer.bold(true);
    printer.println(type);
    printer.bold(false);
    printer.setTextNormal();
    printer.println("Table no: " + tableno);
    // printer.setTypeFontA();
    // printer.setTextSize(1, 1);
    // printer.println("Table NO:-" + tableno);

    printer.setTextNormal();

    printer.tableCustom([
      // Prints table with custom settings (text, align, width, cols, bold)
      { text: "DATE: " + date + "", align: "LEFT" },
      { text: "TIME: " + time + "", align: "RIGHT" },
    ]);

    printer.tableCustom([
      // Prints table with custom settings (text, align, width, cols, bold)
      { text: "Bill # : " + number + "", align: "LEFT" },
      { text: "W.Name: " + waiter + "", align: "RIGHT" },
    ]);
    printer.drawLine();
    printer.tableCustom([
      // Prints table with custom settings (text, align, width, cols, bold)
      { text: "Item Name", align: "LEFT", width: 0.5, bold: true },
      { text: "Qty", align: "RIGHT", width: 0.15, bold: true },
      { text: "Price", align: "RIGHT", width: 0.15, bold: true },
      { text: "Amt", align: "CENTER", width: 0.2, bold: true },
    ]);
    printer.drawLine();
    items.forEach((item) => {
      // printer.tableCustom([
      //   // Prints table with custom settings (text, align, width, cols, bold)
      //   { text: item.name, align: "LEFT" },
      //   { text: item.qty, align: "RIGHT" },
      //   { text: item.price, align: "RIGHT" },
      //   { text: Number(item.qty) * Number(item.price), align: "CENTER" },
      // ]);

      printer.tableCustom([
        // Prints table with custom settings (text, align, width, cols, bold)
        { text: item.name, align: "LEFT", width: 0.5 },
        { text: item.qty, align: "RIGHT", width: 0.15 },
        { text: item.price, align: "RIGHT", width: 0.15 },
        {
          text: Number(item.qty) * Number(item.price),
          align: "CENTER",
          width: 0.2,
        },
      ]);
    });
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
  } else throw console.log("not connected");
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
