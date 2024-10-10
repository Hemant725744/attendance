import React from 'react';
import { Button, View, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import { collection, setDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';  // Your Firebase config

const AttendanceUploadScreen = () => {
  // Function to handle Excel upload and data storage
  const uploadAttendanceExcel = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      if (result.type === "success") {
        const file = await fetch(result.uri);
        const blob = await file.blob();
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];

          // Extract the attendance data as JSON
          const attendanceData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          // Skip the first few rows (header information)
          const relevantData = attendanceData.slice(7);  // Skip header

          // Loop through each student row and upload their attendance to Firestore
          relevantData.forEach(async (row) => {
            const rollNo = row[0];         // Roll No.
            const admissionNo = row[1];    // Admission No.
            const studentName = row[2];    // Name of the Student
            
            // Attendance for subjects
            const attendance = {
              SE: row[3],
              DWM: row[4],
              IP: row[5],
              CN: row[6],
              TCS: row[7],
              PCE: row[8],
              Total: row[13],
              Percentage: row[14],
            };

            // Upload to Firestore using Admission No. as document ID
            await setDoc(doc(firestore, `attendance/${admissionNo}`), {
              rollNo,
              studentName,
              attendance,
            }, { merge: true });
          });
        };

        reader.readAsArrayBuffer(blob);
      }
    } catch (error) {
      console.error("Error uploading Excel: ", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Upload Attendance Excel</Text>
      <Button title="Upload Excel" onPress={uploadAttendanceExcel} />
    </View>
    
  );
};

export default AttendanceUploadScreen;
