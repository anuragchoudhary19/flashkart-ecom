import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table';

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header}>~{new Date().toLocaleString('en-IN')}~</Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>FlashKart</Text>
        <Text style={styles.subtitle}>Order Summary</Text>
        <Table>
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Color</TableCell>
          </TableHeader>
        </Table>
        <Table data={order.products}>
          <TableBody>
            <DataTableCell getContent={(i) => i.product.title} />
            <DataTableCell
              getContent={(i) => i.product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            />
            <DataTableCell getContent={(i) => i.count} />
            <DataTableCell getContent={(i) => i.color} />
          </TableBody>
        </Table>
        <Text>
          <Text style={styles.text}>
            Date:<Text style={styles.text}>{new Date(order.paymentIntent.created * 1000).toLocaleString('en-IN')}</Text>
          </Text>
          {'\n'}
          <Text style={styles.text}>Order Id:{order.paymentIntent.id}</Text>
          {'\n'}
          <Text style={styles.text}>Order Status:{order.orderStatus}</Text>
          {'\n'}
          <Text style={styles.text}>Total Paid:{order.paymentIntent.amount}</Text>
        </Text>
        <Text style={styles.footer}>~Thank You For Shopping With Us~</Text>
      </Page>
    </Document>
  );
};
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    marginRight: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    padding: '100px',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
export default Invoice;
