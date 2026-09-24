import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  ProgressBar,
  Surface,
  Text,
} from 'react-native-paper';
import { fetchCompetition } from '../services/competitionApi';

const tabItems = ['About Competition', 'Judging Parameters', 'Rules & Eligibility'];

export default function CompetitionDetailsScreen() {
  const [competition, setCompetition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchCompetition()
      .then((data) => {
        if (isMounted) {
          setCompetition(data);
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.stateTitle}>Loading competition...</Text>
      </View>
    );
  }

  if (error || !competition) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.stateTitle}>Unable to load competition</Text>
        <Text style={styles.stateMessage}>{error || 'Competition data is unavailable.'}</Text>
      </View>
    );
  }

  const progress = competition.totalSlots
    ? competition.booked / competition.totalSlots
    : 0;
  const registrationDate = competition.importantDates.find(
    (item) => item.label === 'Register Before',
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.headingRow}>
            <Text style={styles.title}>{competition.title}</Text>
            <View style={styles.registeredPill}>
              <Text style={styles.registeredText}>
                {competition.registered ? '✓ Registered' : 'Not registered'}
              </Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            {competition.tags.map((tag) => (
              <Text key={tag} style={styles.metaItem}>{tag}</Text>
            ))}
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.label}>Prize Pool</Text>
              <Text style={styles.value}>₹ {competition.prizePool.toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.label}>Entry Fee</Text>
              <Text style={styles.value}>₹ {competition.entryFee.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.spotsWrap}>
            <Text style={styles.spotsText}>Only {competition.spotsLeft} spots left</Text>
            <ProgressBar progress={progress} color="#0f8f8f" style={styles.progressBar} />
            <Text style={styles.bookingText}>{competition.booked} / {competition.totalSlots} Booked</Text>
          </View>
        </View>

        <Surface style={styles.judgeCard}>
          <View style={styles.judgeRow}>
            <Avatar.Image
              size={64}
              source={{ uri: competition.judge.image }}
            />
            <View style={styles.judgeInfo}>
              <Text style={styles.judgeLabel}>Judge</Text>
              <Text style={styles.judgeName}>{competition.judge.name}</Text>
              <Text style={styles.judgeMeta}>{competition.judge.role}</Text>
              <Text style={styles.judgeMeta}>{competition.judge.experience}</Text>
            </View>
            <Button
              mode="contained"
              compact
              icon="play"
              buttonColor="#1ca1a1"
              textColor="#fff"
              style={styles.videoButton}
              contentStyle={styles.videoButtonContent}
            >
              Intro Video
            </Button>
          </View>
        </Surface>

        <View style={styles.alertRow}>
          <Text style={styles.alertText}>Registration closes</Text>
          <Text style={styles.timeBadge}>
            {registrationDate ? `${registrationDate.date} ${registrationDate.time}` : 'See dates below'}
          </Text>
          <Text style={styles.alertText}>Hurry up!</Text>
        </View>

        <Card style={styles.datesCard}>
          <Card.Content>
            <View style={styles.datesGrid}>
              {competition.importantDates.map((item, index) => (
                <View
                  key={item.label}
                  style={[styles.dateItem, index % 2 === 0 ? styles.dateItemBorderRight : null]}
                >
                  <View style={styles.dateIconWrap}>
                    <Text style={styles.dateIcon}>{item.icon === 'calendar-check-outline' ? '📅' : item.icon === 'file-upload-outline' ? '📤' : item.icon === 'calendar-remove-outline' ? '🗓️' : '🏆'}</Text>
                  </View>
                  <View style={styles.dateTextWrap}>
                    <Text style={styles.dateLabel}>{item.label}</Text>
                    <Text style={styles.dateValue}>{item.date}</Text>
                    <Text style={styles.dateValue}>{item.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Previous Winners</Text>
        </View>

        <View style={styles.winnersRow}>
          {competition.previousWinners.map((winner) => (
            <View key={winner.name} style={styles.winnerCard}>
              <Avatar.Image size={54} source={{ uri: winner.image }} />
              <Text style={styles.winnerName}>{winner.name}</Text>
              <Text style={styles.winnerTitle}>{winner.award}</Text>
              <Button
                compact
                mode="contained-tonal"
                icon="play"
                style={styles.smallPlayButton}
                labelStyle={styles.smallPlayButtonLabel}
              />
            </View>
          ))}
        </View>

        <View style={styles.tabsRow}>
          {tabItems.map((tab, index) => (
            <Text
              key={tab}
              style={[styles.tabItem, index === 0 ? styles.tabItemActive : null]}
            >
              {tab}
            </Text>
          ))}
        </View>

        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            {competition.description}
          </Text>
          <Text style={styles.viewMoreText}>View more ▾</Text>
        </View>

        <View style={styles.rewardsWrap}>
          <Text style={styles.rewardsHeader}>Rewards (All Positions)</Text>
          {competition.rewards.map((reward, index) => (
            <View key={reward.position} style={styles.rewardRow}>
              <View style={styles.rewardLeft}>
                <Text style={styles.rewardIcon}>{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index === 3 ? '🏅' : index === 4 ? '🏅' : '🏅'}</Text>
                <Text style={styles.rewardName}>{reward.position}</Text>
              </View>
              <Text style={styles.rewardPrize}>₹ {reward.amount.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>ⓘ Disclaimer: Only contributions from paid participants will be considered for judging.</Text>
        </View>

        <View style={styles.infoGroup}>
          <View style={styles.infoItemRow}>
            <View style={styles.infoBulletWrap}>
              <Text style={styles.infoBullet}>▶</Text>
            </View>
            <Text style={styles.infoText}>How will you receive prize money? Watch video to know more</Text>
          </View>
          <View style={styles.infoItemRow}>
            <View style={styles.infoBulletWrap}>
              <Text style={styles.infoBullet}>✓</Text>
            </View>
            <Text style={styles.infoText}>Refund policy</Text>
          </View>
          <View style={styles.infoItemRow}>
            <View style={styles.infoBulletWrap}>
              <Text style={styles.infoBullet}>✓</Text>
            </View>
            <Text style={styles.infoText}>Secure payments powered by Razorpay</Text>
          </View>
        </View>

        <View style={styles.referralCard}>
          <View style={styles.referralLeft}>
            <Text style={styles.referralEmoji}>📣</Text>
            <View>
              <Text style={styles.referralTitle}>Refer & Earn more discount</Text>
              <Text style={styles.referralDiscount}>{competition.referral.discountMessage}</Text>
              <View style={styles.referralCodeRow}>
                <Text style={styles.referralLink}>{competition.referral.code}</Text>
                <Button mode="outlined" compact style={styles.copyButton}>Copy Link</Button>
              </View>
            </View>
          </View>
          <Button mode="contained" style={styles.referButton}>Refer Now</Button>
        </View>

        <Surface style={styles.reviewCard}>
          <Text style={styles.reviewTitle}>Hear From Our Users</Text>
          <Text style={styles.reviewSubtitle}>See what participants say about {competition.title}</Text>
          <Text style={styles.arrow}>›</Text>
        </Surface>

        <View style={styles.bottomNav}>
          <View style={styles.navItem}>
            <Text style={styles.navIcon}>⌂</Text>
            <Text style={styles.navLabel}>Home</Text>
          </View>
          <View style={styles.navItem}>
            <Text style={styles.navIcon}>◌</Text>
            <Text style={styles.navLabel}>Explore</Text>
          </View>
          <View style={styles.navItemActive}>
            <Text style={styles.navIconActive}>＋</Text>
          </View>
          <View style={styles.navItem}>
            <Text style={styles.navIcon}>◍</Text>
            <Text style={styles.navLabel}>Competitions</Text>
          </View>
          <View style={styles.navItem}>
            <Text style={styles.navIcon}>◉</Text>
            <Text style={styles.navLabel}>Profile</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  stateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#edf4f3',
  },
  stateTitle: {
    color: '#17293b',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  stateMessage: {
    color: '#4d5c65',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: '#edf4f3',
  },
  contentContainer: {
    paddingBottom: 32,
    paddingHorizontal: 16,
    backgroundColor: '#edf4f3',
  },
  heroCard: {
    backgroundColor: '#f3f7f8',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#dfeae8',
    marginBottom: 18,
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#17293b',
    maxWidth: '68%',
  },
  registeredPill: {
    backgroundColor: '#dff3ef',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  registeredText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f7d7d',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  metaItem: {
    fontSize: 12,
    color: '#4d5c65',
    backgroundColor: '#edf1f1',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    overflow: 'hidden',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    paddingRight: 10,
  },
  label: {
    fontSize: 12,
    color: '#4d5d67',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f1824',
  },
  spotsWrap: {
    marginTop: 8,
  },
  spotsText: {
    fontSize: 12,
    color: '#1d7b7c',
    marginBottom: 6,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#dfe9e7',
  },
  bookingText: {
    marginTop: 8,
    fontSize: 12,
    color: '#4d5d67',
  },
  judgeCard: {
    borderRadius: 18,
    backgroundColor: '#f5f8f8',
    padding: 14,
    marginBottom: 18,
    elevation: 0,
  },
  judgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  judgeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  judgeLabel: {
    fontSize: 13,
    color: '#4d5d67',
    marginBottom: 2,
  },
  judgeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#17293b',
    marginBottom: 4,
  },
  judgeMeta: {
    fontSize: 12,
    color: '#4d5c65',
    marginBottom: 2,
  },
  videoButton: {
    minWidth: 120,
    borderRadius: 18,
  },
  videoButtonContent: {
    height: 42,
  },
  alertRow: {
    backgroundColor: '#d7f1ee',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  alertText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1b4d57',
  },
  timeBadge: {
    fontSize: 13,
    fontWeight: '700',
    color: '#124c69',
  },
  datesCard: {
    marginBottom: 20,
    borderRadius: 18,
    backgroundColor: '#f4f8f8',
    borderWidth: 1,
    borderColor: '#dfeae8',
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateItem: {
    width: '50%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateItemBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#dfeae8',
  },
  dateIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#dff3ef',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dateIcon: {
    fontSize: 18,
  },
  dateTextWrap: {
    flexShrink: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: '#4d5c65',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#102738',
  },
  sectionHeaderRow: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f1a2a',
  },
  winnersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  winnerCard: {
    width: '23%',
    backgroundColor: '#f4f7f7',
    borderRadius: 16,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dde8e7',
    marginBottom: 10,
  },
  winnerName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#102738',
    marginTop: 8,
    textAlign: 'center',
  },
  winnerTitle: {
    fontSize: 10,
    color: '#5c6d76',
    marginBottom: 6,
  },
  smallPlayButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  smallPlayButtonLabel: {
    fontSize: 10,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dfe9e7',
    marginBottom: 14,
    gap: 10,
  },
  tabItem: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#4d5d67',
    textAlign: 'center',
    paddingVertical: 12,
  },
  tabItemActive: {
    color: '#0f8f8f',
    borderBottomWidth: 2,
    borderBottomColor: '#0f8f8f',
  },
  descriptionBox: {
    marginBottom: 18,
  },
  descriptionText: {
    color: '#203040',
    fontSize: 15,
    lineHeight: 24,
  },
  viewMoreText: {
    marginTop: 10,
    color: '#0f8f8f',
    fontWeight: '700',
    fontSize: 14,
  },
  rewardsWrap: {
    backgroundColor: '#f4f8f8',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#dfeae8',
  },
  rewardsHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f1a2a',
    marginBottom: 10,
  },
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dfeae8',
  },
  rewardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  rewardName: {
    fontSize: 15,
    color: '#1d2b30',
  },
  rewardPrize: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0e2d3a',
  },
  noticeBox: {
    backgroundColor: '#d9f0ef',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  noticeText: {
    color: '#1d4f63',
    fontSize: 13,
    fontWeight: '600',
  },
  infoGroup: {
    backgroundColor: '#f0f7f7',
    borderRadius: 16,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#dfeae8',
  },
  infoItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoBulletWrap: {
    width: 22,
    height: 22,
    backgroundColor: '#dff3ef',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  infoBullet: {
    fontSize: 12,
    color: '#0f8f8f',
    fontWeight: '700',
  },
  infoText: {
    fontSize: 14,
    color: '#1d2b30',
    flex: 1,
  },
  referralCard: {
    backgroundColor: '#dff4ef',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  referralLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  referralEmoji: {
    fontSize: 26,
    marginRight: 12,
  },
  referralTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f1a2a',
    marginBottom: 8,
  },
  referralDiscount: {
    fontSize: 12,
    color: '#2b3a41',
    marginBottom: 8,
  },
  referralCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  referralLink: {
    fontSize: 12,
    color: '#2b3a41',
  },
  copyButton: {
    borderRadius: 12,
  },
  referButton: {
    backgroundColor: '#0f8f8f',
    borderRadius: 14,
    marginLeft: 10,
  },
  reviewCard: {
    backgroundColor: '#f3f7f8',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dfeae8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  reviewTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f1a2a',
  },
  reviewSubtitle: {
    fontSize: 11,
    color: '#556772',
  },
  arrow: {
    fontSize: 28,
    color: '#0f8f8f',
    marginLeft: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f8f7',
    borderTopWidth: 1,
    borderTopColor: '#dfeae8',
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navItemActive: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    backgroundColor: '#129da0',
    borderRadius: 16,
    marginHorizontal: 8,
  },
  navIcon: {
    fontSize: 20,
    color: '#4f5e65',
  },
  navIconActive: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
  },
  navLabel: {
    fontSize: 11,
    color: '#4f5e65',
    marginTop: 4,
  },
});
