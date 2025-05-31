import React, { useState, useEffect } from 'react';
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
    Divider,
    CircularProgress,
    Tabs,
    Tab
} from '@mui/material';
import {
    People as PeopleIcon,
    ShoppingCart as OrdersIcon,
    CheckCircle as ResolvedIcon,
    Pending as PendingIcon
} from '@mui/icons-material';
import api from '../services/api';
import { API_URL } from '../config';
import ChatStats from '../components/ChatStats';

const StatCard = ({ title, value, icon, color }) => (
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
                {value}
            </Typography>
        </CardContent>
    </Card>
);

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [dashboardData, setDashboardData] = useState({
        stats: {
            totalUsers: 0,
            totalOrders: 0,
            ordersByStatus: {}
        },
        recentOrders: []
    });
    const [chatData, setChatData] = useState({
        stats: {
            totalChats: 0,
            avgResponseTime: 0,
            successRate: 0,
            satisfactionRate: 0
        },
        recentChats: []
    });

    const fetchData = async () => {
        console.log('Fetching dashboard and chat data...');
        try {
            setLoading(true);
            console.log(`Fetching from ${API_URL}/api/dashboard/stats and ${API_URL}/api/dialogflow/stats`);
            const [dashboardResponse, chatResponse] = await Promise.all([
                api.get('/api/dashboard/stats'),
                api.get('/api/dialogflow/stats')
            ]);
            console.log('Dashboard data received:', dashboardResponse.data);
            console.log('Chat data received:', chatResponse.data);
            setDashboardData(dashboardResponse.data);
            setChatData(chatResponse.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
            console.log('Finished fetching data.');
        }
    };

    useEffect(() => {
        fetchData();
        // Refresh data every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    const { stats, recentOrders } = dashboardData;

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label="Overview" />
                    <Tab label="Chat Analytics" />
                </Tabs>
            </Box>

            {activeTab === 0 ? (
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            title="Total Users"
                            value={stats.totalUsers}
                            icon={<PeopleIcon sx={{ color: 'primary.main' }} />}
                            color="primary"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            title="Total Orders"
                            value={stats.totalOrders}
                            icon={<OrdersIcon sx={{ color: 'secondary.main' }} />}
                            color="secondary"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            title="Resolved Issues"
                            value={stats.ordersByStatus.resolved || 0}
                            icon={<ResolvedIcon sx={{ color: 'success.main' }} />}
                            color="success"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard
                            title="Pending Issues"
                            value={stats.ordersByStatus.pending || 0}
                            icon={<PendingIcon sx={{ color: 'warning.main' }} />}
                            color="warning"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Recent Activity
                            </Typography>
                            <List>
                                {recentOrders && recentOrders.length > 0 ? (
                                    recentOrders.map((order, index) => (
                                        <React.Fragment key={order.id}>
                                            <ListItem>
                                                <ListItemText
                                                    primary={`Order #${order.id}`}
                                                    secondary={`Status: ${order.status} | Total: $${order.total}`}
                                                />
                                            </ListItem>
                                            {index < recentOrders.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <ListItem>
                                        <ListItemText primary="No recent orders" />
                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            ) : (
                <ChatStats stats={chatData.stats} recentChats={chatData.recentChats} />
            )}
        </Box>
    );
};

export default Dashboard; 