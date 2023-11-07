import { Theme, Table } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
//testing
const RadixUITable = () => {
    return (
      <Theme>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>test</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>test</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>test</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>Tämä</Table.RowHeaderCell>
              <Table.Cell>on</Table.Cell>
              <Table.Cell>testi</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>joo</Table.RowHeaderCell>
              <Table.Cell>jep</Table.Cell>
              <Table.Cell>kyllä</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.RowHeaderCell>Tämä</Table.RowHeaderCell>
              <Table.Cell>on</Table.Cell>
              <Table.Cell>testi</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Theme>
    );
  };
  
  export default RadixUITable;
  