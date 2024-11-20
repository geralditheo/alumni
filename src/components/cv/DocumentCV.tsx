import { Document, Page, Text, View, StyleSheet, Line } from '@react-pdf/renderer';

import { CVProfile, CVAcademics, CVJobs, CVInternsip } from '@/app/api/generate-cv/pdf/route';

const styles = StyleSheet.create({
    page: {
      backgroundColor: '#E4E4E4',
      padding: 20
    },
    line: {
      borderBottom: '3px solid black', 
      borderColor: '#78B3CE',   
      marginVertical: 5,     
    },
    head: {
      display: "flex",
      alignItems: 'center',
      paddingVertical: 20
    },
    contingen: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
      paddingVertical: 5,
      fontSize: 12,
      marginBottom: 20,
    },
    openingHead: {
      fontSize: 14,
      marginBottom: 10,
      fontWeight: 'bold'
    },
    openingContent: {
      fontSize: 12,
      marginBottom: 20,
      color: 'gray',
      textAlign: 'justify'
    },
    section: {
      marginBottom: 20
    },
    sectionHead: {
      fontSize: 14,
      marginBottom: 5,
      fontWeight: 'bold',
      color: '#78B3CE',
    },
    sectionContent: {
      fontSize: 12,
      marginVertical: 20,
      textAlign: 'justify',
      fontWeight: 'ultralight',
      marginLeft: 30
    },
});

export const DocumentCV = ({ profile, academics, jobs, internships }: { profile?: CVProfile, academics?: CVAcademics[], jobs?: CVJobs[], internships?: CVInternsip[] }) => {

  return (    
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.head}>
                <Text>{profile?.name}</Text>
            </View>

            <View style={styles.contingen}>
                <Text>{profile?.email}</Text>
                <Text>{profile?.no_hp}</Text>
            </View>

            <View >
                <Text style={styles.openingHead} >Profesional dan Informatif</Text>
                <Text style={styles.openingContent} >
                  Dokumen ini berfungsi sebagai gambaran menyeluruh mengenai perjalanan profesional yang telah ditempuh, mencakup pengalaman kerja, pendidikan, keterampilan, serta pencapaian yang telah diraih sepanjang karier. Dengan latar belakang yang kuat di bidang tertentu, penekanan pada sesuatu, dan komitmen untuk terus berkembang, setiap langkah yang diambil mencerminkan dedikasi untuk memberikan kontribusi yang signifikan dalam berbagai proyek dan tantangan. Tujuan dari dokumen ini adalah untuk menunjukkan potensi yang dapat dioptimalkan dalam mencapai tujuan organisasi yang lebih besar.
                </Text>
            </View>

            {
              academics && academics.length > 0 && (
                <View style={styles.section} >
                  <Text style={styles.sectionHead}>PENDIDIKAN</Text>
                  <View style={styles.line} />
                  {
                    academics.map((academic, index) => (
                      <Text key={index} style={styles.sectionContent}>
                        - Telah lulus di bidang {academic.prodi} dari {academic.nama_studi}, yang terletak di {academic.kota} {academic.negara} , setelah menempuh studi dari {academic.tahun_masuk} hingga {academic.tahun_lulus} dengan nilai {academic.ipk}. {academic.catatan}
                      </Text>
                    ))
                  }
                </View>
              )
            }

            {
              jobs && jobs.length > 0 && (
                <View style={styles.section} >
                  <Text style={styles.sectionHead}>PEKERJAAN</Text>
                  <View style={styles.line} />
                  {
                    jobs.map((job, index) => (
                      <Text key={index} style={styles.sectionContent}>
                        - Menjabat sebagai {job.jabatan_job} di {job.nama_job} di {job.kota}, {job.negara}, dengan fokus pada terhadap kemampuan dan tanggung jawab.  Mulai pada tahun {job.periode_masuk_job} hingga {job.periode_keluar_job}. {job.catatan}
                      </Text>
                    ))
                  }
                </View>
              )
            }

            {
              internships && internships.length > 0 && (
                <View style={styles.section} >
                  <Text style={styles.sectionHead}>MAGANG</Text>
                  <View style={styles.line} />
                  {
                    internships.map((intern, index) => (
                      <Text key={index} style={styles.sectionContent}>
                        - Selama magang di {intern.nama_intern}, saya diberikan tanggung jawab sebagai {intern.jabatan_intern}, di mana saya berkesempatan untuk memperluas wawasan dan keterampilan saya di bidang dengan sungguh - sungguh. Saya terlibat dalam berbagai projek dengan periode {intern.periode_masuk_intern} hingga {intern.periode_keluar_intern}. {intern.catatan}
                      </Text>
                    ))
                  }
                </View>
              )
            }

        </Page>
  </Document>
);
}


