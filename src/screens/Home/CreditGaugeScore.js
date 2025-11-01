import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

/* -----------------------
   Helpers (polar/arc)
   ----------------------- */
const polarToCartesian = (cx, cy, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees + 180) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

const createArc = (cx, cy, radius, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? '0' : '1';
  const sweepFlag = endAngle > startAngle ? '1' : '0';
  return `M ${start.x.toFixed(3)} ${start.y.toFixed(3)} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x.toFixed(3)} ${end.y.toFixed(3)}`;
};

/* -----------------------
   Visual helpers
   ----------------------- */
const getScoreColor = (score) => {
  if (score < 580) return '#FF6B3C';
  if (score < 670) return '#FFD93D';
  if (score < 740) return '#4F6CFF';
  return '#4CAF50';
};

const getStatusText = (score) => {
  if (score > 750) return 'Excellent';
  if (score > 700) return 'Good';
  if (score > 580) return 'Average';
  return 'Poor';
};

/* -----------------------
   Component
   ----------------------- */
const CreditScoreGauge = ({ score = 704, selectedLabel = 'Apr' }) => {
  const minScore = 400;
  const maxScore = 850;
  const normalizedScore = Math.max(minScore, Math.min(maxScore, score));
  const targetProgress = (normalizedScore - minScore) / (maxScore - minScore); // 0..1

  const anim = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0); // 0..1
  const [displayScore, setDisplayScore] = useState(minScore);

  // Layout constants (changed: wider viewBox)
 // 👇 only height-related changes done, everything else same
const VIEW_WIDTH = 340;      // wide
const VIEW_HEIGHT = 100;     // reduced internal height
const SVG_DISPLAY_WIDTH = 600; // keep same width
const SVG_DISPLAY_HEIGHT = 170; // reduced external height
const CX = VIEW_WIDTH / 2;
const CY = VIEW_HEIGHT;
const RADIUS = 80; // slightly smaller radius for better fit
     // same radius; fits inside new width (CX +- RADIUS within VIEW_WIDTH)

  // Segments defined left->right (largest angle -> smallest)
  const segments = [
    { start: 180, end: 139 },
    { start: 136, end: 91 },
    { start: 88, end: 46 },
    { start: 44, end: 0 },
  ];

  useEffect(() => {
    const id = anim.addListener(({ value }) => {
      const v = Math.max(0, Math.min(1, value));
      setProgress(v);
      const currentScore = Math.round(minScore + v * (normalizedScore - minScore));
      setDisplayScore(currentScore);
    });

    anim.stopAnimation(() => {
      Animated.timing(anim, {
        toValue: targetProgress,
        duration: 900,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      anim.removeListener(id);
      anim.stopAnimation();
    };
  }, [targetProgress, normalizedScore, anim]);

  const filledDegrees = progress * 180;
  const gradientId = 'gaugeGradient';
  const statusText = getStatusText(normalizedScore);
  const scoreColor = getScoreColor(normalizedScore);

  return (
    <View style={styles.container}>
      <Svg
        width={SVG_DISPLAY_WIDTH}
        height={SVG_DISPLAY_HEIGHT}
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      >
        <Defs>
          {/* Adjust gradient coordinates to match new viewBox width */}
          <LinearGradient
            id={gradientId}
            x1="0"
            y1={VIEW_HEIGHT}
            x2={VIEW_WIDTH}
            y2={VIEW_HEIGHT}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#a3ff00" />
            <Stop offset="50%" stopColor="#ffe600" />
            <Stop offset="100%" stopColor="#ff7a00" />
          </LinearGradient>
        </Defs>

        {/* background grey segments (static) */}
        <Path d={createArc(CX, CY, RADIUS, 180, 139)} stroke="#EDEDED" strokeWidth={3} fill="none" strokeLinecap="round" />
        <Path d={createArc(CX, CY, RADIUS, 136, 91)} stroke="#EDEDED" strokeWidth={3} fill="none" strokeLinecap="round" />
        <Path d={createArc(CX, CY, RADIUS, 88, 46)} stroke="#EDEDED" strokeWidth={3} fill="none" strokeLinecap="round" />
        <Path d={createArc(CX, CY, RADIUS, 43, 0)} stroke="#EDEDED" strokeWidth={3} fill="none" strokeLinecap="round" />

        {/* colored active arcs: iterate left->right and compute fill relative to left */}
        {segments.map((seg, i) => {
          const segmentLength = seg.start - seg.end;
          const segmentStartOffsetFromLeft = 180 - seg.start;

          if (filledDegrees <= segmentStartOffsetFromLeft) return null;

          const progressInSegment = Math.min(
            filledDegrees - segmentStartOffsetFromLeft,
            segmentLength
          );

          const segmentEndAngle = seg.start - progressInSegment;

          const pathD =
            progressInSegment >= segmentLength - 1e-6
              ? createArc(CX, CY, RADIUS, seg.start, seg.end)
              : createArc(CX, CY, RADIUS, seg.start, segmentEndAngle);

          return (
            <Path
              key={`active-${i}`}
              d={pathD}
              stroke={`url(#${gradientId})`}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
            />
          );
        })}
      </Svg>

      <View style={styles.scoreContainer}>
        <Text style={styles.statusText}>{statusText}</Text>
        <Text style={[styles.scoreText, { color: 'Black' }]}>{displayScore}</Text>
        <Text style={styles.pointsText}>+6pts</Text>
      </View>
    </View>
  );
};

/* -----------------------
   Styles
   ----------------------- */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'ffff',
    borderRadius: 16,
    paddingVertical: 10,
  },
 scoreContainer: {
  position: 'absolute',
  top: 90, // was 80
  alignItems: 'center',
},
  statusText: {
    fontSize: 14,
    color: '#676767',
    marginBottom: 2,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#212121',
  },
  pointsText: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 1,
  },
  dateText: {
    fontSize: 14,
    color: '#999',
    marginTop: 6,
  },
  scaleContainer: {
    width: 280,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  scaleText: {
    fontSize: 14,
    color: '#333',
  },
});

export default CreditScoreGauge;
