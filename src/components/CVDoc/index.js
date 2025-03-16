import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { LOGO_IMAGES } from '../../configs/constants';

// Register Roboto font
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/roboto/Roboto-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/roboto/Roboto-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/roboto/Roboto-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/roboto/Roboto-Black.ttf', fontWeight: 900 },
    { src: '/fonts/roboto/Roboto-Italic.ttf', fontWeight: 400, fontStyle: 'italic' },
  ],
});

const DEFAULT_THEME_COLOR = '#140861';

const CVDoc = ({ resume, user, themeColor }) => {
  const currentThemeColor = themeColor || DEFAULT_THEME_COLOR;

  const styles = StyleSheet.create({
    page: {
      padding: 0,
      backgroundColor: '#FFFFFF',
      fontFamily: 'Roboto',
    },
    firstPage: {
      marginTop: 0,
    },
    header: {
      padding: '40 40 25 40',
      backgroundColor: currentThemeColor,
      color: '#FFFFFF',
      position: 'relative',
    },
    headerContent: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 30,
    },
    avatarContainer: {
      width: 120,
      height: 120,
      borderRadius: '50%',
      backgroundColor: '#FFFFFF',
      padding: 3,
    },
    avatar: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    nameSection: {
      flex: 1,
    },
    name: {
      fontSize: 28,
      fontWeight: 900,
      textTransform: 'uppercase',
      marginBottom: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 500,
      opacity: 0.9,
    },
    contactInfo: {
      marginTop: 20,
      flexDirection: 'row',
      gap: 40,
    },
    contactItem: {
      fontSize: 12,
      opacity: 0.9,
    },
    body: {
      padding: '25 40 40 40',
      fontSize: 12,
    },
    section: {
      marginBottom: 25,
      breakInside: 'avoid',
      paddingTop: 0,
      minPresenceAhead: 100,
    },
    sectionPageBreak: {
      marginTop: 30,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 700,
      color: currentThemeColor,
      marginBottom: 15,
      paddingBottom: 6,
      borderBottom: 1,
      borderBottomColor: currentThemeColor,
    },
    infoGrid: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 20,
    },
    infoItem: {
      width: '47%',
      flexDirection: 'row',
      gap: 10,
    },
    infoLabel: {
      color: currentThemeColor,
      fontWeight: 500,
      width: 100,
      minWidth: 100,
    },
    infoValue: {
      flex: 1,
    },
    experienceItem: {
      marginBottom: 15,
      breakInside: 'avoid',
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    experienceTitle: {
      fontWeight: 700,
      color: currentThemeColor,
      marginBottom: 3,
    },
    experienceCompany: {
      fontWeight: 500,
      marginBottom: 2,
    },
    experienceDate: {
      fontStyle: 'italic',
      color: '#666666',
      fontSize: 11,
    },
    experienceDesc: {
      marginTop: 6,
      lineHeight: 1.5,
    },
    skillsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    skillItem: {
      backgroundColor: `${currentThemeColor}10`,
      padding: '6 12',
      borderRadius: 4,
      color: currentThemeColor,
    },
    languageItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    languageName: {
      width: 120,
      fontWeight: 500,
    },
    languageLevel: {
      flex: 1,
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    levelDot: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: currentThemeColor,
    },
    levelDotEmpty: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: currentThemeColor,
    },
    infoGridWrapper: {
      breakInside: 'avoid',
    },
    skillsWrapper: {
      breakInside: 'avoid',
    },
    languageWrapper: {
      breakInside: 'avoid',
    },
    logoContainer: {
      position: 'absolute',
      top: -25,
      right: 0,
      width: 50,
      height: 50,
      backgroundColor: '#FFFFFF',
      padding: 4,
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: '42px',
      height: '42px',
    },
  });

  const renderLanguageLevel = (level) => {
    const maxLevel = 5;
    const dots = [];
    for (let i = 0; i < maxLevel; i++) {
      dots.push(
        <View
          key={`level-dot-${i}`}
          style={i < level ? styles.levelDot : styles.levelDotEmpty}
        />
      );
    }
    return dots;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                src={LOGO_IMAGES.LOGO_WITH_BG}
              />
            </View>

            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                src={resume?.user?.avatarUrl || "/images/default_avatar.png"}
              />
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.name}>{resume?.user?.fullName}</Text>
              <Text style={styles.title}>{resume?.title}</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactItem}>Email: {user?.email}</Text>
                <Text style={styles.contactItem}>SĐT: {user?.phone}</Text>
                <Text style={styles.contactItem}>
                  Cập nhật: {formatDate(resume?.updateAt)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Body Section */}
        <View style={styles.body}>
          {/* Desired Information */}
          <View style={[styles.section, styles.sectionPageBreak]} wrap={false}>
            <Text style={styles.sectionTitle}>THÔNG TIN CHUNG</Text>
            <View style={styles.infoGridWrapper}>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Vị trí:</Text>
                  <Text style={styles.infoValue}>
                    {resume?.positionChooseData?.name}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Kinh nghiệm:</Text>
                  <Text style={styles.infoValue}>
                    {resume?.experienceChooseData?.name}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Học vấn:</Text>
                  <Text style={styles.infoValue}>
                    {resume?.academicLevelChooseData?.name}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Mức lương:</Text>
                  <Text style={styles.infoValue}>
                    {`${(resume?.salaryMin / 1000000).toFixed(1)} - ${(
                      resume?.salaryMax / 1000000
                    ).toFixed(1)} triệu`}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Nơi làm việc:</Text>
                  <Text style={styles.infoValue}>
                    {resume?.typeOfWorkplaceChooseData?.name}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Hình thức:</Text>
                  <Text style={styles.infoValue}>
                    {resume?.jobTypeChooseData?.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Work Experience */}
          <View style={[styles.section, styles.sectionPageBreak]} wrap={false}>
            <Text style={styles.sectionTitle}>KINH NGHIỆM LÀM VIỆC</Text>
            {resume?.experienceDetails?.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.experienceTitle}>{exp?.jobName}</Text>
                    <Text style={styles.experienceCompany}>{exp?.companyName}</Text>
                  </View>
                  <Text style={styles.experienceDate}>
                      {formatDate(exp?.startDate)} - {formatDate(exp?.endDate) || "Hiện tại"}
                  </Text>
                </View>
                <Text style={styles.experienceDesc}>{exp?.description}</Text>
              </View>
            ))}
          </View>

          {/* Education */}
          <View style={[styles.section, styles.sectionPageBreak]} wrap={false}>
            <Text style={styles.sectionTitle}>HỌC VẤN</Text>
            {resume?.educationDetails?.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.experienceTitle}>{edu?.degreeName}</Text>
                    <Text style={styles.experienceCompany}>
                      {edu?.trainingPlaceName}
                    </Text>
                    <Text style={[styles.experienceCompany, { fontSize: 11 }]}>
                      Chuyên ngành: {edu?.major}
                    </Text>
                  </View>
                  <Text style={styles.experienceDate}>
                    {formatDate(edu?.startDate)} - {formatDate(edu?.completedDate)}
                  </Text>
                </View>
                {edu?.description && (
                  <Text style={styles.experienceDesc}>{edu?.description}</Text>
                )}
              </View>
            ))}
          </View>

          {/* Professional Skills */}
          <View style={[styles.section, styles.sectionPageBreak]} wrap={false}>
            <Text style={styles.sectionTitle}>KỸ NĂNG CHUYÊN MÔN</Text>
            <View style={styles.skillsWrapper}>
              <View style={styles.skillsGrid}>
                {resume?.advancedSkills?.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text>{skill?.name} ({skill?.level}/5)</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Languages */}
          {resume?.languageSkills?.length > 0 && (
            <View style={[styles.section, styles.sectionPageBreak]} wrap={false}>
              <Text style={styles.sectionTitle}>NGOẠI NGỮ</Text>
              <View style={styles.languageWrapper}>
                {resume?.languageSkills?.map((lang, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text style={styles.languageName}>
                      Tiếng {lang?.language}
                    </Text>
                    <View style={styles.languageLevel}>
                      {renderLanguageLevel(lang?.level)}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Certificates */}
          {resume?.certificateDetails?.length > 0 && (
            <View style={[styles.section, styles.sectionPageBreak]} wrap={false}>
              <Text style={styles.sectionTitle}>CHỨNG CHỈ</Text>
              {resume.certificateDetails.map((cert, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View>
                      <Text style={styles.experienceTitle}>{cert?.name}</Text>
                      <Text style={styles.experienceCompany}>
                        {cert?.trainingPlace}
                      </Text>
                    </View>
                    <Text style={styles.experienceDate}>
                      {formatDate(cert?.startDate)}
                      {cert?.expirationDate
                        ? ` - ${formatDate(cert?.expirationDate)}`
                        : " - Không thời hạn"}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

// Add default props
CVDoc.defaultProps = {
  themeColor: DEFAULT_THEME_COLOR,
};

export default CVDoc;

