using backend_secuill.Models;
using backend_secuill.Models.Label;
using backend_secuill.Interface;
using System.Runtime.InteropServices;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Printing;
using System.Drawing.Drawing2D;
namespace backend_secuill.Repositories
{
    public class PrintLabelRepository: IPrintLabel
    {
        private readonly SecuillV5TuContext _DbContext ;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public PrintLabelRepository(SecuillV5TuContext secuillV5TuContext, IWebHostEnvironment webHostEnvironment)
        {
            this._DbContext = secuillV5TuContext;
            this._webHostEnvironment = webHostEnvironment;
        }

        private DataTable dt;
        private string DrugCode = "";
        private string DrugName = "";
        private string Qty = "";
        private string Unit = "";
        private string Barcode = "";
        public async Task<string> PrintLabelRefill(bodyArrayPrint bodyArrayPrints)
        {
            dt = new DataTable();
            //System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            dt.TableName = "dt1";
            dt.Columns.Add(new DataColumn("DrugCode"));
            dt.Columns.Add(new DataColumn("DrugName"));
            dt.Columns.Add(new DataColumn("RefillQty"));
            dt.Columns.Add(new DataColumn("DrugUnit"));
            dt.Columns.Add(new DataColumn("Barcode"));
            dt.Rows.Clear();
            foreach (var body in bodyArrayPrints.Print)
            {
                dt.Rows.Add(
                    body.DrugCode,
                    body.DrugName,
                    body.RefillQty,
                    body.DrugUnit,
                    $"*{body.Barcode}*"
                    );
            }

            return Print();
        }
        private void PrintDocument_PrintPage(object sander, System.Drawing.Printing.PrintPageEventArgs e)
        {         
            var _Brushes = Brushes.Black;
            double x = 0;
            double y = 0;
            double w = 0;
            double h = 0;
            var point = new Point();
            var size = new Size();
            var layoutRectangle = new Rectangle();
            StringFormat sf = new StringFormat(); ;
            var fontname = "CordiaUPC";
            var fontbarcode = "Libre Barcode 39";
            string text = "";


            //  = title =  
            Font font_title = new Font(fontname, 16.0F, FontStyle.Bold);
            x = 0;
            y = convertCmToPxDpi(0.5);
            w = convertCmToPxDpi(7);
            h = convertCmToPxDpi(1);
            text = "เติมยา";
            point = new Point((int)x, (int)y);
            size = new Size((int)w, (int)h);
            layoutRectangle = new Rectangle(point, size);
            sf.LineAlignment = StringAlignment.Center;
            sf.Alignment = StringAlignment.Center;
            e.Graphics.DrawString(text, font_title, _Brushes, layoutRectangle,sf);
            //=====================

            // =  DrugCode =
            Font font_drugcode = new Font(fontname, 14.0F, FontStyle.Regular);
            x = convertCmToPxDpi(0.5);
            y += h + convertCmToPxDpi(0.1);
            w = convertCmToPxDpi(7);
            h = convertCmToPxDpi(1);
            point = new Point((int)x, (int)y);
            size = new Size((int)w, (int)h);
            layoutRectangle = new Rectangle(point, size);
            text = DrugCode;
            e.Graphics.DrawString(text, font_drugcode, _Brushes, layoutRectangle);
            //=====================

            // = DrugName =
            Font font_drugname = new Font(fontname, 13.0F, FontStyle.Regular);
            x = convertCmToPxDpi(0.5);
            y += h;
            w = convertCmToPxDpi(7);
            h = convertCmToPxDpi(1);
            point = new Point((int)x, (int)y);
            size = new Size((int)w, (int)h);
            layoutRectangle = new Rectangle(point, size);
            text = DrugName;
            e.Graphics.DrawString(text, font_drugname, _Brushes, layoutRectangle);
            //=====================

            // = Qty =
            Font font_qty = new Font(fontname, 14, FontStyle.Regular);
            x = convertCmToPxDpi(0.5);
            y += h;
            w = convertCmToPxDpi(7);
            h = convertCmToPxDpi(1);
            point = new Point((int)x, (int)y);
            size = new Size((int)w, (int)h);
            layoutRectangle = new Rectangle(point, size);
            text =$"จำนวน  {Qty}  {Unit}";
            e.Graphics.DrawString(text, font_qty, _Brushes, layoutRectangle);
            //=====================

            Font font_bacode = new Font(fontbarcode, 25.0F, FontStyle.Regular);
            x = convertCmToPxDpi(0.5);
            y += h;
            w = convertCmToPxDpi(7);
            h = convertCmToPxDpi(1);
            point = new Point((int)x, (int)y);
            size = new Size((int)w, (int)h);
            layoutRectangle = new Rectangle(point, size);
            text = Barcode;
            e.Graphics.DrawString(text, font_bacode, _Brushes, layoutRectangle);
        }

        private string Print()
        {
            IConfiguration config = new ConfigurationBuilder()
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false).Build();
            string PrinterName = config.GetSection("Printer:PrinterName").Value;           
            for ( int i = 0; i <= dt.Rows.Count - 1; i++)
            {
                this.DrugCode = dt.Rows[i].Field<string>("DrugCode").ToString();
                this.DrugName = dt.Rows[i].Field<string>("DrugName").ToString();
                this.Unit = dt.Rows[i].Field<string>("DrugUnit").ToString();
                this.Qty = dt.Rows[i].Field<string>("RefillQty").ToString();
                this.Barcode = dt.Rows[i].Field<string>("Barcode").ToString();
                PrintDocument pd = new PrintDocument();
                try
                {
                    pd.PrintPage += PrintDocument_PrintPage;
                    pd.PrintController = new StandardPrintController();
                    pd.PrinterSettings.PrinterName = PrinterName;
                    pd.Print();
                }
                catch (Exception ex)
                {
                    return ex.ToString();
                }
            }
            return "SUCCESS";

        }
        private double convertCmToPxDpi(double cm )
        {
            double pixel = 0;
            pixel = cm * 37;
            return pixel;
        } 
    }
}
