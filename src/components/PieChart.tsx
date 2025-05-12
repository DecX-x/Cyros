import React from 'react';
import { View } from 'react-native';
import Svg, { G, Circle, Text as SvgText } from 'react-native-svg';
import { colors } from '../styles/globalStyles';

interface PieChartProps {
  data: { value: number; color: string; label: string }[];
  size?: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, size = 200 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const center = size / 2;
  const radius = center - 10;
  let startAngle = 0;

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={size} height={size}>
        <G transform={`translate(${center}, ${center})`}>
          {data.map((item, index) => {
            const angle = (item.value / total) * 360;
            const endAngle = startAngle + angle;
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            // Calculate start and end coordinates
            const x1 = center + radius * Math.cos((Math.PI * startAngle) / 180);
            const y1 = center + radius * Math.sin((Math.PI * startAngle) / 180);
            const x2 = center + radius * Math.cos((Math.PI * endAngle) / 180);
            const y2 = center + radius * Math.sin((Math.PI * endAngle) / 180);

            const path = `
              M ${center},${center}
              L ${x1},${y1}
              A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}
              Z
            `;

            startAngle = endAngle;

            return (
              <G key={index}>
                <Circle
                  cx={0}
                  cy={0}
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={radius / 2}
                  strokeDasharray={[2 * Math.PI * radius * (item.value / total), 2 * Math.PI * radius]}
                  strokeDashoffset={2 * Math.PI * radius * 0.25}
                  rotation={startAngle - angle / 2}
                />
                <SvgText
                  x={radius * 0.7 * Math.cos((Math.PI * (startAngle - angle / 2)) / 180)}
                  y={radius * 0.7 * Math.sin((Math.PI * (startAngle - angle / 2)) / 180)}
                  fill={colors.text}
                  fontSize="12"
                  textAnchor="middle"
                >
                  {item.label}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

export default PieChart;