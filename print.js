const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

let printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: "tcp://192.168.1.19",
});
async function print() {
  let isConnected = await printer.isPrinterConnected();

  if (isConnected) {
    console.log(isConnected);
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
      console.log(execute);
      retValue = 1;
    } catch (error) {
      retValue = -1;
      console.log("Print failed:", error);
    }
  }
}

print();

// let isConnected = printer.isPrinterConnected().then(() => {
//   printer.setTypeFontA();
//   printer.alignCenter();
//   printer.setTextSize(1, 1);
//   printer.bold(true);
//   printer.println("type");
//   printer.bold(false);
//   printer.setTextNormal();
//   printer.println("(" + "hotel" + ")");
//   printer.setTypeFontA();
//   printer.setTextSize(1, 1);
//   printer.println("Table NO:-" + "12");

//   printer.setTextNormal();

//   printer.tableCustom([
//     // Prints table with custom settings (text, align, width, cols, bold)
//     { text: "" + "getDate()" + "", align: "LEFT" },
//     { text: "" + "getTime()" + "", align: "RIGHT" },
//   ]);

//   printer.tableCustom([
//     // Prints table with custom settings (text, align, width, cols, bold)
//     { text: "KOT Number  : " + "kotNo" + "", align: "LEFT" },
//     { text: "Waiter Name : " + "waiter" + "", align: "RIGHT" },
//   ]);
//   printer.drawLine();

//   printer.drawLine();
//   printer.cut();

//   try {
//     console.log("try");
//     let execute = await printer.execute();
//     console.log(execute);
//     retValue = 1;
//   } catch (error) {
//     retValue = -1;
//     console.log("Print failed:", error);
//   }
// });

// console.log("isConnected");
// console.log(isConnected);
// console.log("connectedBool");
// console.log(connectedBool);

// if (isConnected) {
//   console.log(isConnected);
//   printer.setTypeFontA();
//   printer.alignCenter();
//   printer.setTextSize(1, 1);
//   printer.bold(true);
//   printer.println("type");
//   printer.bold(false);
//   printer.setTextNormal();
//   printer.println("(" + "hotel" + ")");
//   printer.setTypeFontA();
//   printer.setTextSize(1, 1);
//   printer.println("Table NO:-" + "12");

//   printer.setTextNormal();

//   printer.tableCustom([
//     // Prints table with custom settings (text, align, width, cols, bold)
//     { text: "" + "getDate()" + "", align: "LEFT" },
//     { text: "" + "getTime()" + "", align: "RIGHT" },
//   ]);

//   printer.tableCustom([
//     // Prints table with custom settings (text, align, width, cols, bold)
//     { text: "KOT Number  : " + "kotNo" + "", align: "LEFT" },
//     { text: "Waiter Name : " + "waiter" + "", align: "RIGHT" },
//   ]);
//   printer.drawLine();

//   printer.drawLine();
//   printer.cut();

//   try {
//     console.log("try");
//     let execute = await printer.execute();
//     console.log(execute);
//     retValue = 1;
//   } catch (error) {
//     retValue = -1;
//     console.log("Print failed:", error);
//   }
// }
