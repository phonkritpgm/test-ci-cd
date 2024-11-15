import styles from './TableTemp.module.css'

interface ITableHeaderName{
  Date: string
  OrderID: string
  Name: string
  Price: string
  Quantity: string
  Total: string
}

interface IDataTest{
  Date: string
  OrderID: string
  Name: string
  Price: string
  Quantity: string
  Total: string
}

type PropsTable = {
  header: ITableHeaderName
  data: IDataTest[]
}

const dataTestHeader: ITableHeaderName = {
  Date: "Date",
  OrderID: "OrderID",
  Name: "Name",
  Price: "Price",
  Quantity: "Quantity",
  Total: "Total",
}
const dataTestTable: IDataTest[] = [
  {
    Date: "2017-09-29 01:22",
    OrderID: "200398",
    Name: "iPhone X 64Gb Gray",
    Price: "$999.00",
    Quantity: "1",
    Total: "$999.00"
  },
  {
    Date: "2017-09-29 01:22",
    OrderID: "200398",
    Name: "iPhone X 64Gb Gray",
    Price: "$999.00",
    Quantity: "1",
    Total: "$999.00"
  },
  {
    Date: "2017-09-29 01:22",
    OrderID: "200398",
    Name: "iPhone X 64Gb Gray",
    Price: "$999.00",
    Quantity: "1",
    Total: "$999.00"
  },
  {
    Date: "2017-09-29 01:22",
    OrderID: "200398",
    Name: "iPhone X 64Gb Gray",
    Price: "$999.00",
    Quantity: "1",
    Total: "$999.00"
  },
  {
    Date: "2017-09-29 01:22",
    OrderID: "200398",
    Name: "iPhone X 64Gb Gray",
    Price: "$999.00",
    Quantity: "1",
    Total: "$999.00"
  },
  {
    Date: "2017-09-29 01:22",
    OrderID: "200398",
    Name: "iPhone X 64Gb Gray",
    Price: "$999.00",
    Quantity: "1",
    Total: "$999.00"
  },
  {
    Date: "2017-09-29 01:22",
    OrderID: "200398",
    Name: "iPhone X 64Gb Gray",
    Price: "$999.00",
    Quantity: "1",
    Total: "$999.00"
  },
  {
    Date: "2017-09-29 01:22",
    OrderID: "200398",
    Name: "iPhone X 64Gb Gray",
    Price: "$999.00",
    Quantity: "1",
    Total: "$999.00"
  },
  {
    Date: "2017-09-29 01:22",
    OrderID: "200398",
    Name: "iPhone X 64Gb Gray",
    Price: "$999.00",
    Quantity: "1",
    Total: "$999.00"
  },
  {
    Date: "2017-09-29 01:22",
    OrderID: "200398",
    Name: "iPhone X 64Gb Gray",
    Price: "$999.00",
    Quantity: "1",
    Total: "$999.00"
  },
  {
    Date: "2017-09-29 01:22",
    OrderID: "200398",
    Name: "iPhone X 64Gb Gray",
    Price: "$999.00",
    Quantity: "1",
    Total: "$999.00"
  }

];

const TableTemp: React.FC<PropsTable> = ({header, data}) => {
  // data test
  header = dataTestHeader;
  data = dataTestTable;
  return (
    <div className={ styles.container_table100 }>
      <div className={ styles.wrap_table100 }>
        <div className={ styles.table100 }>
          <table>
            <thead>
              <tr className={ styles.table100_head }>
                <th className={ styles.column1 }>{header.Date}</th>
                <th className={ styles.column2 }>{header.OrderID}</th>
                <th className={ styles.column3 }>{header.Name}</th>
                <th className={ styles.column4 }>{header.Price}</th>
                <th className={ styles.column5 }>{header.Quantity}</th>
                <th className={ styles.column6 }>{header.Total}</th>
              </tr>
            </thead>
            <tbody>
              { 
                data.map( d => (
                  <tr>
                    <td className={ styles.column1 }>{d.Date}</td>
                    <td className={ styles.column2 }>{d.OrderID}</td>
                    <td className={ styles.column3 }>{d.Name}</td>
                    <td className={ styles.column4 }>{d.Price}</td>
                    <td className={ styles.column5 }>{d.Quantity}</td>
                    <td className={ styles.column6 }>{d.Total}</td>
                  </tr>
                ))
              }        
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

TableTemp.defaultProps = {
  header: dataTestHeader,
  data: dataTestTable
}

export default TableTemp;
