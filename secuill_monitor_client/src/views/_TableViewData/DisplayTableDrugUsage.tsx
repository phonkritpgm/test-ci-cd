import { v4 as uuidv4 } from "uuid";
import TableDisplayHistory from "../../components/OtherComp/TableDisplayHistory/TableDisplayHistory";
import { useEffect } from "react";
import { iReportSummaryPick } from "../../interface/iReport";
import { useSelector } from "react-redux";

// select ROW_NUMBER() OVER(ORDER BY md.drug_name_en ASC) as rowNumber , md.drug_name_en, sum(t1.ver_qty) as ver_qty, sum(t1.free_qty) as free_qty, sum(( t1.ver_qty + t1.free_qty )) as PickAll
// from M_Drug md
// join (	 
// 		  select drug_code, sum(ver_qty) as ver_qty, sum(free_qty) as free_qty, pickType
// 		  from (
// 				  select drug_code, pick_qty as ver_qty, 0 as free_qty , 'Ver' as pickType
// 				  from T_SummaryPickPrescription
// 				  where pick_qty > 0
// 				  union
// 				  select drug_code, 0 as ver_qty, pick_qty as free_qty , 'Free' as pickType
// 				  from T_SummaryPickFreeOrder
// 				  where pick_qty > 0
// 				) result
// 		  group by drug_code, pickType
// 	  ) t1
// on md.drug_code = t1.drug_code
// where drug_status = '1'
// group by md.drug_name_en
// order by md.drug_name_en

// rowNumber	drug_name_en	                                ver_qty	    free_qty	PickAll
// 1	        Adenocor inj. 6mg/2ml (Adenosine)	            0.00	    9.00	    9.00
// 2	        ADRENALINE # INJ. 1MG/ML(GPO)****	            0.00	    34.00	    34.00
// 3	        ATROPINE# INJ. 0.6 MG/ML (GPO)	                6.00	    18.00	    24.00
// 4	        CALCIUM GLUCONATE**** INJ. 10% 10ML	            1.00	    6.00	    7.00
// 5	        Cardepine inj. 10mg/10ml (Nicardipine)	        0.00	    2.00	    2.00
// 6	        CHLORPHENIRAMINE # INJ. 10MG/ML(GPO)	        2.00	    6.00	    8.00
// 7	        Cordarone # inj. 150 mg/3ml	                    0.00	    4.00	    4.00
// 8	        DEXAMETHASONE# INJ. 5MG/ML (LODEXA)	            4.00	    6.00	    10.00
// 9	        DIAZEPAM # INJ. 10MG/2ML (GPO)	                1.00	    6.00	    7.00
// 10	        Dobu-tamine #inj. 250 mg/20ml	                0.00	    1.00	    1.00
// 11	        FURETIC INJ. #20MG/2ML	                        1.00	    10.00	    11.00
// 12	        Furosemide # inj. 250 mg/25ml	                0.00	    3.00	    3.00
// 13	        GLUCOSE INJ. 50% 20ML (ANB)	                    1.00	    0.00	    1.00
// 14	        GLYCOPHOS INJ. 20 ML (I)	                    5.00	    0.00	    5.00
// 15	        Hydrocortisone inj. 100 mg	                    0.00	    6.00	    6.00
// 16	        KCL**** INJ. 20MEQ/10ML(PLASTIC)	            1.00	    0.00	    1.00
// 17	        LANOXIN # INJ. 0.25MG/ML 2ML****	            0.00	    1.00	    1.00
// 18	        MAGNESIUM SULFATE INJ**** 50% 2ML(ATC)	        2.00	    8.00	    10.00
// 19	        NAUSIL INJ. 10 MG/2ML	                        1.00	    6.00	    7.00
// 20	        PETHIDINE 1 ML**** INJ. 50 MG./ML ยส	        0.00	    1.00	    1.00
// 21	        VANCOMYCIN# INJ. 1G (VANCIN-S)	                7.00	    2.00	    9.00
// 22	        Vit. B1 inj. 100 mg/ml	                        0.00	    6.00	    6.00
// 23	        VIT. K1** INJ. 10 MG	                        0.00	    1.00	    1.00

const DisplayTableDrugUsage = () => {

    const dataSummryPick: iReportSummaryPick[] = useSelector((state: any) => state.report.dataReportSummaryPick.data);

    const columnsName = [
        {
            Header: "No",
            accessor: "0",
            enableRowSpan: true, 
            filedDuplicate: true,
            cellCenter: true,
        },
        {
            Header: "รหัสยา",
            accessor: "1",
            enableRowSpan: true, 
            filedDuplicate: true,
            cellCenter: false,
        },
        {
            Header: "ชื่อยา",
            accessor: "2",
            enableRowSpan: true, 
            filedDuplicate: true,
            cellCenter: false,
        },
        {
            Header: "Verify",
            accessor: "3",
            enableRowSpan: true,  
            filedDuplicate: true,
            cellCenter: true,
        },
        {
            Header: "FreeDispense",
            accessor: "4",
            enableRowSpan: true, 
            filedDuplicate: true,
            cellCenter: true, 
        },
        {
            Header: "SummaryPick",
            accessor: "5",
            enableRowSpan: true, 
            filedDuplicate: true,
            cellCenter: true,
        },
    ]

    useEffect(()=>{
     
    },[]);
    // const dataTest = [
    //     {  no: 1, drugName: "Adenocor inj. 6mg/2ml (Adenosine)", ver: 0.00, free: 9.00, sum: 9.00,
    //     },{no: 2, drugName: "ADRENALINE # INJ. 1MG/ML(GPO)****", ver: 0.00, free: 34.00, sum: 34.0,
    //     },{no: 3, drugName: "ATROPINE# INJ. 0.6 MG/ML (GPO)", ver: 6.00, free: 18.00, sum: 24.0,
    //     },{no: 4, drugName: "CALCIUM GLUCONATE**** INJ. 10% 10ML", ver: 1.00, free: 6.00, sum: 7.00,
    //     },{no: 5, drugName: "Cardepine inj. 10mg/10ml (Nicardipine)", ver: 0.00, free: 2.00, sum: 2.00,
    //     },{no: 6, drugName: "CHLORPHENIRAMINE # INJ. 10MG/ML(GPO)", ver: 2.00, free: 6.00, sum: 8.00,
    //     },{no: 7, drugName: "Cordarone # inj. 150 mg/3ml", ver: 0.00, free: 4.00, sum: 4.00,
    //     },{no: 8, drugName: "DEXAMETHASONE# INJ. 5MG/ML (LODEXA)", ver: 4.00, free: 6.00, sum: 10.0,
    //     },{no: 9, drugName: "DIAZEPAM # INJ. 10MG/2ML (GPO)", ver: 1.00, free: 6.00, sum: 7.00,
    //     },{no: 10, drugName: "Dobu-tamine #inj. 250 mg/20ml", ver: 0.00, free: 1.00, sum: 1.00,
    //     },{no: 11, drugName: "FURETIC INJ. #20MG/2ML", ver: 1.00, free: 10.00, sum: 11.0,
    //     },{no: 12, drugName: "Furosemide # inj. 250 mg/25ml", ver: 0.00, free: 3.00, sum: 3.00,
    //     },{no: 13, drugName: "GLUCOSE INJ. 50% 20ML (ANB)", ver: 1.00, free: 0.00, sum: 1.00,
    //     },{no: 14, drugName: "GLYCOPHOS INJ. 20 ML (I)", ver: 5.00, free: 0.00, sum: 5.00,
    //     },{no: 15, drugName: "Hydrocortisone inj. 100 mg", ver: 0.00, free: 6.00, sum: 6.00,
    //     },{no: 16, drugName: "KCL**** INJ. 20MEQ/10ML(PLASTIC)", ver: 1.00, free: 0.00, sum: 1.00,
    //     },{no: 17, drugName: "LANOXIN # INJ. 0.25MG/ML 2ML****", ver: 0.00, free: 1.00, sum: 1.00,
    //     },{no: 18, drugName: "MAGNESIUM SULFATE INJ**** 50% 2ML(ATC)", ver: 2.00, free: 8.00, sum: 10.0,
    //     },{no: 19, drugName: "NAUSIL INJ. 10 MG/2ML", ver: 1.00, free: 6.00, sum: 7.00,
    //     },{no: 20, drugName: "PETHIDINE 1 ML**** INJ. 50 MG./ML ยส", ver: 0.00, free: 1.00, sum: 1.00,
    //     },{no: 21, drugName: "VANCOMYCIN# INJ. 1G (VANCIN-S)", ver: 7.00, free: 2.00, sum: 9.00,
    //     },{no: 22, drugName: "Vit. B1 inj. 100 mg/ml", ver: 0.00, free: 6.00, sum: 6.00,
    //     },{no: 23, drugName: "VIT. K1** INJ. 10 MG", ver: 0.00, free: 1.00, sum: 1.00,
    //     },      
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
            data={[ mergePickName(dataSummryPick) ]} 
        />
    )
}
export default DisplayTableDrugUsage;