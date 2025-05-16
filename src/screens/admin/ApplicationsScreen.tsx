import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

type Application = {
  id: string;
  petId: string;
  petName: string;
  applicantName: string;
  applicantEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
};

const ApplicationsScreen = () => {
  const { theme } = useTheme();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const loadApplications = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const mockApplications: Application[] = [
          {
            id: '1',
            petId: '1',
            petName: 'Buddy',
            applicantName: 'John Doe',
            applicantEmail: 'john@example.com',
            status: 'pending',
            submittedAt: '2023-05-15T10:30:00Z',
          },
          {
            id: '2',
            petId: '2',
            petName: 'Mittens',
            applicantName: 'Jane Smith',
            applicantEmail: 'jane@example.com',
            status: 'pending',
            submittedAt: '2023-05-16T14:45:00Z',
          },
        ];
        setApplications(mockApplications);
      } catch (error) {
        console.error('Failed to load applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadApplications();
  }, []);

  const handleUpdateStatus = (id: string, newStatus: 'approved' | 'rejected') => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const renderApplicationItem = ({ item }: { item: Application }) => (
    <View style={[styles.applicationCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.applicationHeader}>
        <Text style={[styles.petName, { color: theme.colors.primary }]}>
          {item.petName}
        </Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === 'approved'
                  ? theme.colors.success
                  : item.status === 'rejected'
                  ? theme.colors.error
                  : '#FFC107',
            },
          ]}
        >
          <Text style={styles.statusText}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <Text style={[styles.applicantName, { color: theme.colors.text }]}>
        {item.applicantName}
      </Text>
      <Text style={[styles.applicantEmail, { color: theme.colors.text }]}>
        {item.applicantEmail}
      </Text>
      <Text style={[styles.submittedDate, { color: theme.colors.text }]}>
        Applied on: {new Date(item.submittedAt).toLocaleDateString()}
      </Text>

      {item.status === 'pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.approveButton, { backgroundColor: theme.colors.success }]}
            onPress={() => handleUpdateStatus(item.id, 'approved')}
          >
            <Text style={styles.actionButtonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rejectButton, { backgroundColor: theme.colors.error }]}
            onPress={() => handleUpdateStatus(item.id, 'rejected')}
          >
            <Text style={styles.actionButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Adoption Applications</Text>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Loading applications...
          </Text>
        </View>
      ) : (
        <FlatList
          data={applications}
          renderItem={renderApplicationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.colors.text }]}>
                No applications found.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  applicationCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  applicantName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  applicantEmail: {
    fontSize: 14,
    marginBottom: 4,
  },
  submittedDate: {
    fontSize: 12,
    marginBottom: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  approveButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
  rejectButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ApplicationsScreen;