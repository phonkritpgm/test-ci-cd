import { v4 as uuidv4 } from "uuid";
import TableDisplayHistory from "../../components/OtherComp/TableDisplayHistory/TableDisplayHistory";
import { useSelector } from "react-redux";
import { iReportDrugExp } from "../../interface/iReport";


// select md.drug_name_en, dln.lot_no, dln.lot_bbe, dln.lot_exp, dln.lot_qty, dln.lot_maxqty
// from M_Drug md
// join M_DrugLotNumber dln
// on md.drug_code = dln.drug_code
// where md.drug_status = '1'
// and dln.lot_status = '1'
// order by md.drug_name_en

// Adenocor inj. 6mg/2ml (Adenosine)	205260A	2022-12-30 00:00:00.000	2023-06-30 00:00:00.000	8.00	8.00
// ADRENALINE # INJ. 1MG/ML(GPO)****	J640206	2022-12-18 00:00:00.000	2023-06-18 00:00:00.000	20.00	20.00
// ATROPINE# INJ. 0.6 MG/ML (GPO)	J630462	2023-05-30 00:00:00.000	2023-11-30 00:00:00.000	6.00	6.00
// CALCIUM GLUCONATE**** INJ. 10% 10ML	J640087	2024-09-08 00:00:00.000	2025-03-08 00:00:00.000	20.00	22.00
// Cardepine inj. 10mg/10ml (Nicardipine)	P004259	2023-05-30 00:00:00.000	2023-11-30 00:00:00.000	0.00	0.00
// CHLORPHENIRAMINE # INJ. 10MG/ML(GPO)	J630556	2023-07-31 00:00:00.000	2024-01-31 00:00:00.000	6.00	8.00
// CHLORPHENIRAMINE # INJ. 10MG/ML(GPO)	J640219	2024-01-05 00:00:00.000	2024-07-05 00:00:00.000	2.00	2.00
// CISATRACURIUM KABI # INJ. ****2MG/ML 5ML	90QG032E	2022-12-30 00:00:00.000	2023-06-30 00:00:00.000	27.00	26.00
// Colistin 150 mg inj.	213257	2023-11-25 00:00:00.000	2024-05-25 00:00:00.000	6.00	6.00
// Cordarone # inj. 150 mg/3ml	AA086	2022-05-30 00:00:00.000	2022-11-30 00:00:00.000	6.00	10.00
// Cordarone # inj. 150 mg/3ml	CA013	2022-09-03 00:00:00.000	2023-03-03 00:00:00.000	4.00	4.00
// DEXAMETHASONE# INJ. 5MG/ML (LODEXA)	1070203	2024-09-09 00:00:00.000	2025-03-09 00:00:00.000	2.00	8.00
// DEXAMETHASONE# INJ. 5MG/ML (LODEXA)	1070210	2024-12-10 00:00:00.000	2025-06-10 00:00:00.000	5.00	5.00
// DIAZEPAM # INJ. 10MG/2ML (GPO)	J630510	2023-06-03 00:00:00.000	2023-12-03 00:00:00.000	21.00	22.00
// Dipotassium phosphate inj. 20 ml (20mEq/20ml)	M9K75	2022-05-06 00:00:00.000	2022-11-06 00:00:00.000	5.00	5.00
// Dopamine # inj. 250 mg/10ml	1070439-1	2023-03-02 00:00:00.000	2023-09-02 00:00:00.000	8.00	8.00
// Fentany # inj. 500 mcg/10ml	1462117	2023-03-20 00:00:00.000	2023-09-20 00:00:00.000	22.00	22.00
// FURETIC INJ. #20MG/2ML	1073867	2023-08-03 00:00:00.000	2024-02-03 00:00:00.000	18.00	37.00
// Furosemide # inj. 250 mg/25ml	4610285	2024-09-01 00:00:00.000	2025-03-01 00:00:00.000	9.00	5.00
// Glucose 50%_50ml	085662	2025-11-30 00:00:00.000	2026-05-31 00:00:00.000	4.00	4.00
// GLUCOSE INJ. 50% 20ML (ANB)	068175	2024-09-30 00:00:00.000	2025-03-31 00:00:00.000	12.00	6.00
// GLYCOPHOS INJ. 20 ML (I)	12MNL22	2022-05-30 00:00:00.000	2022-11-30 00:00:00.000	5.00	5.00
// HEPARIN LEO INJ. 5000U/ML,5ML****	C56983	2023-11-03 00:00:00.000	2024-05-03 00:00:00.000	5.00	5.00
// Hydrocortisone inj. 100 mg	H24A114	2023-11-30 00:00:00.000	2024-05-31 00:00:00.000	2.00	8.00
// Hydrocortisone inj. 100 mg	H24A116	2024-02-29 00:00:00.000	2024-08-31 00:00:00.000	3.00	3.00
// KCL**** INJ. 20MEQ/10ML(PLASTIC)	B20172	2023-06-20 00:00:00.000	2023-12-20 00:00:00.000	5.00	5.00
// LANOXIN # INJ. 0.25MG/ML 2ML****	555M	2022-10-11 00:00:00.000	2023-04-11 00:00:00.000	3.00	4.00
// MAGNESIUM SULFATE INJ**** 50% 2ML(ATC)	213119	2024-09-30 00:00:00.000	2025-03-31 00:00:00.000	17.00	28.00
// Midazolam # inj. 5mg/ml_1ml	1562106	2023-01-02 00:00:00.000	2023-07-02 00:00:00.000	16.00	16.00
// Minirin inj. 4 mcg/ml_1ml (Desmopressin)	S14150H	2024-01-31 00:00:00.000	2024-07-31 00:00:00.000	10.00	10.00
// MORPHINE INJ. 10 MG/ML****ยส	56AAT	2023-08-07 00:00:00.000	2024-02-07 00:00:00.000	40.00	40.00
// NAUSIL INJ. 10 MG/2ML	1074510	2023-09-07 00:00:00.000	2024-03-07 00:00:00.000	2.00	2.00
// NAUSIL INJ. 10 MG/2ML	1075087	2023-10-26 00:00:00.000	2024-04-26 00:00:00.000	1.00	1.00
// NAUSIL INJ. 10 MG/2ML	1073456	2023-07-25 00:00:00.000	2024-01-25 00:00:00.000	4.00	10.00
// PETHIDINE 1 ML**** INJ. 50 MG./ML ยส	36EUX	2022-05-17 00:00:00.000	2022-11-17 00:00:00.000	38.00	40.00
// Phenytoin # inj. 250 mg/5ml	OHR5091	2022-01-31 00:00:00.000	2022-07-31 00:00:00.000	5.00	5.00
// Propofol inj. 1 %_20ml (10mg/ml)	16QA0162	2023-07-26 00:00:00.000	2024-01-26 00:00:00.000	8.00	8.00
// Propofol inj. 1 %_50ml (10mg/ml)	211628071	2022-10-19 00:00:00.000	2023-04-19 00:00:00.000	4.00	4.00
// SOD.BICARB.(ATC) 50 ML. INJ. 7.5%	213192	2024-11-06 00:00:00.000	2025-05-06 00:00:00.000	12.00	6.00
// Vancomycin 500 mg	10723921-1	2023-04-19 00:00:00.000	2023-10-19 00:00:00.000	0.00	0.00
// VANCOMYCIN# INJ. 1G (VANCIN-S)	1073277-1	2023-05-26 00:00:00.000	2023-11-26 00:00:00.000	5.00	5.00
// Vit. B1 inj. 100 mg/ml	079022	2023-06-30 00:00:00.000	2023-12-31 00:00:00.000	20.00	20.00
// VIT. K1** INJ. 10 MG	213028	2022-06-30 00:00:00.000	2022-12-31 00:00:00.000	8.00	10.00
// VIT. K1** INJ. 10 MG	213187	2022-11-30 00:00:00.000	2023-05-31 00:00:00.000	1.00	1.00

const DisplayTableLotExp = () => {
    const dataDrugExp: iReportDrugExp[] = useSelector((state: any) => state.report.dataReportDrugExp.data);
    const columnsName = [
        {
            Header: "รหัสยา",
            accessor: "0",
            enableRowSpan: true,
            filedDuplicate: true,
            cellCenter: false,
        },
        {
            Header: "ชื่อยา",
            accessor: "1",
            enableRowSpan: true,
            filedDuplicate: true,
            cellCenter: false,
        },
        {
            Header: "LotNumber",
            accessor: "2",
            enableRowSpan: true,
            filedDuplicate: false,
            cellCenter: true,
        },
        {
            Header: "lot_exp(-6M)",
            accessor: "3",
            enableRowSpan: false,
            filedDuplicate: false,
            cellCenter: true,
        },
        {
            Header: "คงเหลือ",
            accessor: "4",
            enableRowSpan: false,
            filedDuplicate: false,
            cellCenter: true,
        },
        {
            Header: "จำนวนเติม",
            accessor: "5",
            enableRowSpan: false,
            filedDuplicate: false,
            cellCenter: true,
        },
    ]

    // const dataTest = [

    //     {  drugName: "Adenocor inj. 6mg/2ml (Adenosine)", lot_no: '205260A', lot_exp_calc: '2022-12-30',	lot_qty: 8.00, lot_maxqty: 8.00,
    //     },{drugName: "ADRENALINE # INJ. 1MG/ML(GPO)****", lot_no: 'J640206', lot_exp_calc: '2022-12-18',	lot_qty: 20.00	, lot_maxqty: 20.00,
    //     },{drugName: "ATROPINE# INJ. 0.6 MG/ML (GPO)", lot_no: 'J630462', lot_exp_calc: '2023-05-30',	lot_qty: 6.00	, lot_maxqty: 6.00,
    //     },{drugName: "CALCIUM GLUCONATE**** INJ. 10% 10ML", lot_no: 'J640087', lot_exp_calc: '2024-09-08',	lot_qty: 20.00	, lot_maxqty: 22.00,
    //     },{drugName: "Cardepine inj. 10mg/10ml (Nicardipine)", lot_no: 'P004259', lot_exp_calc: '2023-05-30',	lot_qty: 0.00	, lot_maxqty: 0.00,
    //     },{drugName: "CHLORPHENIRAMINE # INJ. 10MG/ML(GPO)", lot_no: 'J630556', lot_exp_calc: '2023-07-31',	lot_qty: 6.00	, lot_maxqty: 8.00,
    //     },{drugName: "CHLORPHENIRAMINE # INJ. 10MG/ML(GPO)", lot_no: 'J640219', lot_exp_calc: '2024-01-05',	lot_qty: 2.00	, lot_maxqty: 2.00,
    //     },{drugName: "CISATRACURIUM KABI # INJ. ****2MG/ML 5ML", lot_no: '90QG032E', lot_exp_calc: '2022-12-30',	lot_qty: 27.00	, lot_maxqty: 26.00,
    //     },{drugName: "Colistin 150 mg inj.", lot_no: '213257', 	lot_exp_calc: '2023-11-25',	lot_qty: 6.00	, lot_maxqty: 6.00,
    //     },{drugName: "Cordarone # inj. 150 mg/3ml", lot_no: 'AA086', 	lot_exp_calc: '2022-05-30',	lot_qty: 6.00	, lot_maxqty: 10.00,
    //     },{drugName: "Cordarone # inj. 150 mg/3ml", lot_no: 'CA013', 	lot_exp_calc: '2022-09-03',	lot_qty: 4.00	, lot_maxqty: 4.00,
    //     },{drugName: "DEXAMETHASONE# INJ. 5MG/ML (LODEXA)", lot_no: '1070203', 	lot_exp_calc: '2024-09-09',	lot_qty: 2.00	, lot_maxqty: 8.00,
    //     },{drugName: "DEXAMETHASONE# INJ. 5MG/ML (LODEXA)", lot_no: '1070210', 	lot_exp_calc: '2024-12-10',	lot_qty: 5.00	, lot_maxqty: 5.00,
    //     },{drugName: "DIAZEPAM # INJ. 10MG/2ML (GPO)", lot_no: 'J630510', 	lot_exp_calc: '2023-06-03',	lot_qty: 21.00	, lot_maxqty: 22.00,
    //     },{drugName: "Dipotassium phosphate inj. 20 ml (20mEq/20ml)	", lot_no: 'M9K75', lot_exp_calc: '2022-05-06',	lot_qty: 5.00	, lot_maxqty: 5.00,
    //     },{drugName: "Dopamine # inj. 250 mg/10ml", lot_no: '1070439-1', lot_exp_calc: '2023-03-02',	lot_qty: 8.00	, lot_maxqty: 8.00,
    //     },{drugName: "Fentany # inj. 500 mcg/10ml", lot_no: '1462117', 	lot_exp_calc: '2023-03-20',	lot_qty: 22.00	, lot_maxqty: 22.00,
    //     },{drugName: "FURETIC INJ. #20MG/2ML", lot_no: '1073867', lot_exp_calc: '2023-08-03',	lot_qty: 18.00	, lot_maxqty: 37.00,
    //     },{drugName: "Furosemide # inj. 250 mg/25ml", lot_no: '4610285', lot_exp_calc: '2024-09-01',	lot_qty: 9.00	, lot_maxqty: 5.00,
    //     },{drugName: "Glucose 50%_50ml", lot_no: '085662', 	lot_exp_calc: '2025-11-30',	lot_qty: 4.00	, lot_maxqty: 4.00,
    //     },{drugName: "GLUCOSE INJ. 50% 20ML (ANB)", lot_no: '068175', lot_exp_calc: '2024-09-30',	lot_qty: 12.00	, lot_maxqty: 6.00,
    //     },{drugName: "GLYCOPHOS INJ. 20 ML (I)", lot_no: '12MNL22', lot_exp_calc: '2022-05-30',	lot_qty: 5.00	, lot_maxqty: 5.00,
    //     },{drugName: "HEPARIN LEO INJ. 5000U/ML,5ML****", lot_no: 'C56983', lot_exp_calc: '2023-11-03',	lot_qty: 5.00	, lot_maxqty: 5.00,
    //     },{drugName: "Hydrocortisone inj. 100 mg", lot_no: 'H24A114', lot_exp_calc: '2023-11-30',	lot_qty: 2.00	, lot_maxqty: 8.00,
    //     },{drugName: "Hydrocortisone inj. 100 mg", lot_no: 'H24A114', lot_exp_calc: '2024-02-29',	lot_qty: 3.00	, lot_maxqty: 3.00,
    //     },{drugName: "KCL**** INJ. 20MEQ/10ML(PLASTIC)", lot_no: 'B20172', lot_exp_calc: '2023-06-20',	lot_qty: 5.00	, lot_maxqty: 5.00,
    //     },{drugName: "LANOXIN # INJ. 0.25MG/ML 2ML****", lot_no: '555M', lot_exp_calc: '2022-10-11',	lot_qty: 3.00	, lot_maxqty: 4.00,
    //     },{drugName: "MAGNESIUM SULFATE INJ**** 50% 2ML(ATC)", lot_no: '213119', lot_exp_calc: '2024-09-30',	lot_qty: 17.00	, lot_maxqty: 28.00,
    //     },{drugName: "Midazolam # inj. 5mg/ml_1ml", lot_no: '1562106', lot_exp_calc: '2023-01-02',	lot_qty: 16.00	, lot_maxqty: 16.00,
    //     },{drugName: "Minirin inj. 4 mcg/ml_1ml (Desmopressin)", lot_no: 'S14150H', lot_exp_calc: '2024-01-31',	lot_qty: 10.00	, lot_maxqty: 10.00,
    //     },{drugName: "MORPHINE INJ. 10 MG/ML****ยส", lot_no: '56AAT', lot_exp_calc: '2023-08-07',	lot_qty: 40.00	, lot_maxqty: 40.00,
    //     },{drugName: "NAUSIL INJ. 10 MG/2ML", lot_no: '1074510', lot_exp_calc: '2023-09-07',	lot_qty: 2.00	, lot_maxqty: 2.00,
    //     },{drugName: "NAUSIL INJ. 10 MG/2ML", lot_no: '1075087', lot_exp_calc: '2023-10-26',	lot_qty: 1.00	, lot_maxqty: 1.00,
    //     },{drugName: "NAUSIL INJ. 10 MG/2ML", lot_no: '1073456', lot_exp_calc: '2023-07-25',	lot_qty: 4.00	, lot_maxqty: 10.00,
    //     },{drugName: "PETHIDINE 1 ML**** INJ. 50 MG./ML ยส", lot_no: '36EUX', lot_exp_calc: '2022-05-17',	lot_qty: 38.00	, lot_maxqty: 40.00,
    //     },{drugName: "Phenytoin # inj. 250 mg/5ml", lot_no: 'OHR5091', lot_exp_calc: '2022-01-31',	lot_qty: 5.00	, lot_maxqty: 5.00,
    //     },{drugName: "Propofol inj. 1 %_20ml (10mg/ml)", lot_no: '16QA0162', lot_exp_calc: '2023-07-26',	lot_qty: 8.00	, lot_maxqty: 8.00,
    //     },{drugName: "Propofol inj. 1 %_50ml (10mg/ml)", lot_no: '211628071', lot_exp_calc: '2022-10-19',	lot_qty: 4.00	, lot_maxqty: 4.00,
    //     },{drugName: "SOD.BICARB.(ATC) 50 ML. INJ. 7.5%", lot_no: '213192', lot_exp_calc: '2024-11-06',	lot_qty: 12.00	, lot_maxqty: 6.00,
    //     },{drugName: "Vancomycin 500 mg", lot_no: '10723921-1', lot_exp_calc: '2023-04-19',	lot_qty: 0.00	, lot_maxqty: 0.00,
    //     },{drugName: "VANCOMYCIN# INJ. 1G (VANCIN-S)", lot_no: '1073277-1', lot_exp_calc: '2023-05-26',	lot_qty: 5.00	, lot_maxqty: 5.00,
    //     },{drugName: "Vit. B1 inj. 100 mg/ml", lot_no: '079022', lot_exp_calc: '2023-06-30',	lot_qty: 20.00	, lot_maxqty: 20.00,
    //     },{drugName: "VIT. K1** INJ. 10 MG", lot_no: '213028', lot_exp_calc: '2022-06-30',	lot_qty: 8.00	, lot_maxqty: 10.00,
    //     },{drugName: "VIT. K1** INJ. 10 MG", lot_no: '213187', lot_exp_calc: '2022-11-30',	lot_qty: 1.00	, lot_maxqty: 1.00,
    //     }   
    // ]


    const mergePickName = (data: any[]): object[] => {
        if(data.length == 0 || data.length == undefined){
            return [];
        }

        // set columns math data
        columnsName.map(( col, i ) => {
            if(i > Object.keys(data[0]).length){
                return
            }
            col.accessor = Object.keys(data[0])[i];
        })

        return data;
    }

    return(
        <TableDisplayHistory key={uuidv4()}
            columns={[columnsName]} 
            data={[ mergePickName(dataDrugExp) ]} 
        />
    )
}
export default DisplayTableLotExp;