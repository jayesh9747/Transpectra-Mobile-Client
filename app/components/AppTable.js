
// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { DataTable, Text } from 'react-native-paper';

// const AppTable = ({ title, data }) => {
//   if (!data || data.length === 0) {
//     return (
//       <View style={styles.tableContainer}>
//         <Text style={styles.tableTitle}>{title}</Text>
//         <Text style={styles.emptyMessage}>No data available</Text>
//       </View>
//     );
//   }

//   const filterData = (data) => {
//     return data.map((item) => {
//       const filteredItem = { ...item };
//       delete filteredItem.id;
//       return filteredItem;
//     });
//   };

//   const filteredData = filterData(data);
//   const keys = Object.keys(filteredData[0]);

//   return (
//     <View style={styles.tableContainer}>
//       <Text style={styles.tableTitle}>{title}</Text>
//       <DataTable>
//         {keys.map((key) => (
//           <DataTable.Row key={key}>
//             <DataTable.Cell>{key}</DataTable.Cell>
//             {filteredData.map((item, index) => (
//               <DataTable.Cell key={`${key}-${index}`} style={styles.cell}>{item[key]}</DataTable.Cell>
//             ))}
//           </DataTable.Row>
//         ))}
//       </DataTable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tableContainer: {
//     margin: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     overflow: 'hidden',
//   },
//   tableTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     padding: 10,
//     backgroundColor: '#f8f8f8',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   cell: {
//     justifyContent: 'center',
//     textAlign: 'center',
//   },
//   emptyMessage: {
//     padding: 10,
//     textAlign: 'center',
//     color: '#999',
//   },
// });

// export default AppTable;


import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, Text } from 'react-native-paper';

const AppTable = ({ title, data }) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>{title}</Text>
        <Text style={styles.emptyMessage}>No data available</Text>
      </View>
    );
  }

  const filterData = (data) => {
    return data.map((item) => {
      const filteredItem = { ...item };
      delete filteredItem.id;
      return filteredItem;
    });
  };

  const filteredData = filterData(data);

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>{title}</Text>
      <DataTable>
        {filteredData.map((item, index) => (
          <View key={index} style={styles.rowContainer}>
            {Object.keys(item).map((key) => (
              <DataTable.Row key={key}>
                <DataTable.Cell style={styles.cellKey}>{key}</DataTable.Cell>
                <DataTable.Cell style={styles.cellValue}>{item[key]}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </View>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  rowContainer: {
    marginBottom: 5,
  },
  cellKey: {
    flex: 1,
    fontWeight: 'bold',
  },
  cellValue: {
    flex: 2,
    textAlign: 'right',
  },
  emptyMessage: {
    padding: 10,
    textAlign: 'center',
    color: '#999',
  },
});

export default AppTable;
