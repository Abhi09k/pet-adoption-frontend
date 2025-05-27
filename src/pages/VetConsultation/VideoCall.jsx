import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, Box, Button, Card, CardContent, Grid, IconButton, Paper, Alert } from '@mui/material';
import Webcam from 'react-webcam';
import { CallEnd, Mic, MicOff, Videocam, VideocamOff, ScreenShare, Chat, MoreVert } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const VideoCall = () => {
  const { appointmentId } = useParams();
  const webcamRef = useRef(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [time, setTime] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const toggleScreenShare = () => {
    setScreenSharing(!screenSharing);
    // In a real app, you would implement screen sharing logic here
  };

  const endCall = () => {
    setCallEnded(true);
    // In a real app, you would disconnect from the video call here
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'You', time: new Date().toLocaleTimeString() }]);
      setNewMessage('');
      // In a real app, you would send the message to the other participant
    }
  };

  if (callEnded) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Call Ended
            </Typography>
            <Typography variant="body1" gutterBottom>
              Duration: {formatTime(time)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Thank you for using our veterinary consultation service.
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => window.location.href = '/dashboard'}
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', position: 'relative' }}>
        {/* Main video area */}
        <Box sx={{ 
          flexGrow: 1, 
          backgroundColor: '#333', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative'
        }}>
          {videoEnabled ? (
            <Webcam
              audio={audioEnabled}
              ref={webcamRef}
              style={{
                width: '100%',
                height: '100%',
                objectFit: screenSharing ? 'contain' : 'cover',
                transform: screenSharing ? 'none' : 'scaleX(-1)'
              }}
            />
          ) : (
            <Box sx={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#222'
            }}>
              <Typography variant="h6" color="text.secondary">
                Camera is turned off
              </Typography>
            </Box>
          )}
          
          {/* Doctor's video (simulated) */}
          <Paper sx={{ 
            position: 'absolute', 
            bottom: 16, 
            right: 16, 
            width: 200, 
            height: 150,
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: '#444', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <avatar sx={{ width: 60, height: 60 }}>
                D
              </avatar>
            </Box>
          </Paper>
          
          {/* Call timer */}
          <Box sx={{ 
            position: 'absolute', 
            top: 16, 
            left: 16, 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 2
          }}>
            <Typography variant="body1">
              {formatTime(time)}
            </Typography>
          </Box>
        </Box>
        
        {/* Chat panel */}
        {showChat && (
          <Paper sx={{ 
            width: 300, 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            borderLeft: '1px solid #ddd'
          }}>
            <Box sx={{ 
              p: 2, 
              borderBottom: '1px solid #ddd', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="subtitle1">Chat</Typography>
              <IconButton size="small" onClick={() => setShowChat(false)}>
                <MoreVert />
              </IconButton>
            </Box>
            
            <Box sx={{ 
              flexGrow: 1, 
              p: 2, 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {messages.map((msg, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    mb: 2,
                    alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%'
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {msg.sender} • {msg.time}
                  </Typography>
                  <Paper 
                    sx={{ 
                      p: 1.5,
                      backgroundColor: msg.sender === 'You' ? '#4a148c' : '#f5f5f5',
                      color: msg.sender === 'You' ? 'white' : 'inherit'
                    }}
                  >
                    {msg.text}
                  </Paper>
                </Box>
              ))}
            </Box>
            
            <Box sx={{ p: 2, borderTop: '1px solid #ddd' }}>
              <textField
                fullWidth
                size="small"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                InputProps={{
                  endAdornment: (
                    <IconButton 
                      edge="end" 
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <send />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </Paper>
        )}
      </Box>
      
      {/* Controls */}
      <Box sx={{ 
        backgroundColor: '#f5f5f5', 
        p: 2, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <IconButton 
              color={audioEnabled ? 'primary' : 'default'}
              onClick={toggleAudio}
              sx={{ backgroundColor: audioEnabled ? 'rgba(74, 20, 140, 0.1)' : 'transparent' }}
            >
              {audioEnabled ? <Mic /> : <MicOff />}
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton 
              color={videoEnabled ? 'primary' : 'default'}
              onClick={toggleVideo}
              sx={{ backgroundColor: videoEnabled ? 'rgba(74, 20, 140, 0.1)' : 'transparent' }}
            >
              {videoEnabled ? <Videocam /> : <VideocamOff />}
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton 
              color={screenSharing ? 'primary' : 'default'}
              onClick={toggleScreenShare}
              sx={{ backgroundColor: screenSharing ? 'rgba(74, 20, 140, 0.1)' : 'transparent' }}
            >
              <ScreenShare />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton 
              color={showChat ? 'primary' : 'default'}
              onClick={() => setShowChat(!showChat)}
              sx={{ backgroundColor: showChat ? 'rgba(74, 20, 140, 0.1)' : 'transparent' }}
            >
              <Chat />
            </IconButton>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              color="error"
              startIcon={<CallEnd />}
              onClick={endCall}
              sx={{ borderRadius: 5, px: 3 }}
            >
              End Call
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VideoCall;