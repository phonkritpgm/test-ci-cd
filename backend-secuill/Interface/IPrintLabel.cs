using backend_secuill.Models.Label;

namespace backend_secuill.Interface
{
    public interface IPrintLabel
    {
        Task<string> PrintLabelRefill(bodyArrayPrint bodyArrayPrints);
    }
}
