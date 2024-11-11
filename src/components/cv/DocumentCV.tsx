import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import { Alumni } from '@/hooks/profile/alumni/useStore.hook';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
});

export const DocumentCV = ({ profile }: { profile?: Alumni }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>{profile?.email}</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
        </Page>
  </Document>
);