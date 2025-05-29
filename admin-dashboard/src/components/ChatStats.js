import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Chat as ChatIcon,
  Timer as TimerIcon,
  ThumbUp as ThumbUpIcon,
  SentimentSatisfied as SatisfactionIcon
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color, suffix = '' }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ 
          backgroundColor: `${color}.light`, 
          borderRadius: '50%', 
          p: 1, 
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </Box>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div">
        {value}{suffix}
      </Typography>
    </CardContent>
  </Card>
);

const ChatStats = ({ stats, recentChats }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Chats"
          value={stats.totalChats}
          icon={<ChatIcon sx={{ color: 'primary.main' }} />}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Avg Response Time"
          value={stats.avgResponseTime}
          icon={<TimerIcon sx={{ color: 'secondary.main' }} />}
          color="secondary"
          suffix="s"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Success Rate"
          value={stats.successRate}
          icon={<ThumbUpIcon sx={{ color: 'success.main' }} />}
          color="success"
          suffix="%"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Satisfaction Rate"
          value={stats.satisfactionRate}
          icon={<SatisfactionIcon sx={{ color: 'warning.main' }} />}
          color="warning"
          suffix="%"
        />
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recent Chats
          </Typography>
          <List>
            {recentChats && recentChats.length > 0 ? (
              recentChats.map((chat, index) => (
                <React.Fragment key={chat._id}>
                  <ListItem>
                    <ListItemText
                      primary={chat.query}
                      secondary={`Response Time: ${chat.responseTime}s | Intent: ${chat.intent}`}
                    />
                  </ListItem>
                  {index < recentChats.length - 1 && <Divider />}
                </React.Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No recent chats" />
              </ListItem>
            )}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChatStats; 