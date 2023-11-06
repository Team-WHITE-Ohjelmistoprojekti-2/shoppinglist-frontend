import React from "react";
import { Theme } from "@radix-ui/themes";
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
        </Table.Root>
      </Theme>
    );
  };
  
  export default RadixUITable;
  