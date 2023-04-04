import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  Image,
  PDFViewer,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

Font.register({
  family: 'Times-Roman',
  fontStyle: 'Times-Italic',
  fontWeight: 'Times-Bold',
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 40,
    fontSize: 13,
  },
});

const CVPdf = () => {
  return (
    <PDFViewer style={{ width: '100%', height: 800 }} >
      <Document >
        <Page size="A4" style={styles.body} >
          <View style={{ alignItems: 'center' }}>
            <View>
              <Image
                style={{ width: 90, height: 90, borderRadius: '50%' }}
                src="https://cdn1.vieclam24h.vn/images/default/2022/08/10/images/huy_bui_khanh_vieclam24h_vn_166010996879.png"
              />
            </View>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 24,
                  marginTop: 10,
                  textTransform: 'uppercase',
                }}
              >
                Bùi Khánh Huy
              </Text>
            </View>
            <View>
              <Text style={{ marginTop: 5, fontSize: 20 }}>
                Product Manager
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <Text>Ngày sinh: 27-02-2001</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>Email: Khuy220@gmail.com</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>So dien thoai: 0888425094</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 18 }}>THONG TIN CHUNG</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 5 }}>
                    <Text>Nghe nghiep: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>IT</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Dia diem lam viec: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>TP. HCM</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Cap bac mong muon: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Nhan vien</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Muc luong mong muon: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>10.000.000 ₫ - 15.000.000 ₫</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Trinh do hoc van: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Dai hoc</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Kinh nghiem lam viec: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Duoi 1 nam kinh nghiem</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Noi lam viec mong muon: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Van phong</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 5 }}>
                    <Text>Hinh thuc lam viec mong muon: </Text>
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Nhan vien chinh thuc</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 18 }}>MUC TIEU NGHE NGHIEP</Text>
              </View>
              <View>
                <Text>
                  Casi todo aquel día caminó sin acontecerle cosa que de contar
                  fuese, de lo cual se desesperaba, porque quisiera topar luego
                  luego con quien hacer experiencia del valor de su fuerte
                  brazo. Autores hay que dicen que la primera aventura que le
                  avino fue la del Puerto Lápice, otros dicen que la de los
                  molinos de viento; pero lo que yo he podido averiguar en este
                  caso, y lo que he hallado escrito en los anales de la Mancha,
                  es que él anduvo todo aquel día
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={{ fontSize: 18 }}>KINH NGHIỆM LÀM VIỆC</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View>
                  <Text style={{ fontStyle: 'Times-Italic' }}>
                    09/2022 - 03/2023
                  </Text>
                </View>
                <View>
                  <Text>Lap trình viên Python</Text>
                </View>
                <View>
                  <Text>Cong ty TNHH MTV DV Vien Thong Phuong Nam</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text>
                    Casi todo aquel día caminó sin acontecerle cosa que de
                    contar fuese, de lo cual se desesperaba, porque quisiera
                    topar luego luego con quien hacer experiencia del valor de
                    su fuerte brazo. Autores hay que dicen que la primera
                    aventura que le avino fue la del Puerto Lápice, otros dicen
                    que la de los
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <View>
                  <Text style={{ fontStyle: 'Times-Italic' }}>
                    09/2022 - 03/2023
                  </Text>
                </View>
                <View>
                  <Text>Lap trình viên Python</Text>
                </View>
                <View>
                  <Text>Cong ty TNHH MTV DV Vien Thong Phuong Nam</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text>
                    Casi todo aquel día caminó sin acontecerle cosa que de
                    contar fuese, de lo cual se desesperaba, porque quisiera
                    topar luego luego con quien hacer experiencia del valor de
                    su fuerte brazo. Autores hay que dicen que la primera
                    aventura que le avino fue la del Puerto Lápice, otros dicen
                    que la de los
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={{ fontSize: 18 }}>HOC VAN</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View>
                  <Text>09/2022 - 03/2023</Text>
                </View>
                <View>
                  <Text>Cong nghe thong tin</Text>
                </View>
                <View>
                  <Text>Cử nhân - Đại học Mở Thành phố Hồ Chí Minh</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text>
                    Casi todo aquel día caminó sin acontecerle cosa que de
                    contar fuese, de lo cual se desesperaba, porque quisiera
                    topar luego luego con quien hacer experiencia del valor de
                    su fuerte brazo. Autores hay que dicen que la primera
                    aventura que le avino fue la del Puerto Lápice, otros dicen
                    que la de los
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={{ fontSize: 18 }}>CHUNG CHI</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View>
                  <Text style={{ fontStyle: 'italic' }}>09/2022 - 03/2023</Text>
                </View>
                <View>
                  <Text>Cong nghe thong tin</Text>
                </View>
                <View>
                  <Text>Cử nhân - Đại học Mở Thành phố Hồ Chí Minh</Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 18 }}>KY NANG NGON NGU</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>Anh (5/5)</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>Anh (5/5)</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>Anh (5/5)</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>Anh (5/5)</Text>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 18 }}>KY NANG CHUYEN MON</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>JAVASCRIPT (5/5)</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                <Text>Python (5/5)</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default CVPdf;
