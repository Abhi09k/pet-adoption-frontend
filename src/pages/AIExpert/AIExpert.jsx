import React, { useState, useRef } from 'react';
import { Container, Typography, Box, TextField, Button, Card, CardContent, Avatar, Paper, IconButton, Divider, CircularProgress } from '@mui/material';
import { Send, Upload, Image, Videocam, Delete } from '@mui/icons-material';

const AIExpert = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I\'m your pet care assistant. How can I help you with your pet today?', timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleSendMessage = () => {
    if (!newMessage.trim() && !uploadedImage && !uploadedVideo) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      image: uploadedImage,
      video: uploadedVideo,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    setUploadedImage(null);
    setUploadedVideo(null);
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: getAIResponse(newMessage),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('diet')) {
      return 'Nutrition is very important for pets. The right food depends on your pet\'s age, breed, and health conditions. For dogs, high-quality dry or wet food with protein as the first ingredient is recommended. Cats are obligate carnivores and need meat-based diets. Always ensure fresh water is available.';
    } else if (lowerMessage.includes('behavior') || lowerMessage.includes('acting')) {
      return 'Behavioral issues can stem from various causes like stress, boredom, or health problems. For dogs, consistent training and exercise often help. Cats may need environmental enrichment. If behavior changes suddenly, consult a vet to rule out medical issues.';
    } else if (lowerMessage.includes('health') || lowerMessage.includes('sick')) {
      return 'If your pet is showing signs of illness like lethargy, loss of appetite, vomiting, or unusual behavior, please consult a veterinarian promptly. For non-emergencies, you can describe the symptoms and I can offer general advice, but professional medical advice is always best.';
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('activity')) {
      return 'Exercise needs vary by pet. Dogs typically need 30 minutes to 2 hours of activity daily, depending on breed. Cats benefit from interactive play sessions. Regular exercise prevents obesity and behavioral problems.';
    } else {
      return 'I\'m here to help with your pet care questions. Could you provide more details about your concern? If you\'ve uploaded a photo or video, I can offer more specific advice based on what I see.';
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setUploadedVideo(null); // Clear video if image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedVideo(reader.result);
        setUploadedImage(null); // Clear image if video is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMedia = () => {
    setUploadedImage(null);
    setUploadedVideo(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI Pet Care Expert
      </Typography>
      
      <Card elevation={3} sx={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {messages.map((message) => (
            <Box 
              key={message.id} 
              sx={{ 
                display: 'flex', 
                mb: 3,
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Box sx={{ 
                maxWidth: '80%',
                display: 'flex',
                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: 2
              }}>
                <Avatar sx={{ 
                  bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                  width: 40, 
                  height: 40
                }}>
                  {message.sender === 'user' ? 'U' : 'AI'}
                </Avatar>
                
                <Paper 
                  elevation={1} 
                  sx={{ 
                    p: 2,
                    backgroundColor: message.sender === 'user' ? '#e3f2fd' : '#f5f5f5',
                    borderRadius: message.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0'
                  }}
                >
                  {message.text && (
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                      {message.text}
                    </Typography>
                  )}
                  
                  {message.image && (
                    <Box sx={{ mt: 2 }}>
                      <img 
                        src={message.image} 
                        alt="Uploaded by user" 
                        style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} 
                      />
                    </Box>
                  )}
                  
                  {message.video && (
                    <Box sx={{ mt: 2 }}>
                      <video 
                        controls 
                        style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                      >
                        <source src={message.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </Box>
                  )}
                  
                  <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'right' }}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          ))}
          
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>AI</Avatar>
                <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: '18px 18px 18px 0' }}>
                  <CircularProgress size={24} />
                </Paper>
              </Box>
            </Box>
          )}
        </CardContent>
        
        <Divider />
        
        <Box sx={{ p: 2 }}>
          {(uploadedImage || uploadedVideo) && (
            <Box sx={{ 
              position: 'relative', 
              mb: 2,
              width: 'fit-content',
              border: '1px dashed #ddd',
              borderRadius: 1,
              p: 1
            }}>
              {uploadedImage && (
                <img 
                  src={uploadedImage} 
                  alt="Preview" 
                  style={{ maxHeight: 100, maxWidth: 200 }} 
                />
              )}
              {uploadedVideo && (
                <video 
                  src={uploadedVideo} 
                  style={{ maxHeight: 100, maxWidth: 200 }}
                />
              )}
              <IconButton
                size="small"
                onClick={handleRemoveMedia}
                sx={{ 
                  position: 'absolute', 
                  top: -10, 
                  right: -10, 
                  backgroundColor: 'white',
                  boxShadow: 1
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about pet care..."
              variant="outlined"
            />
            
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <input
              type="file"
              accept="video/*"
              ref={videoInputRef}
              onChange={handleVideoUpload}
              style={{ display: 'none' }}
            />
            
            <IconButton 
              color="primary" 
              onClick={() => fileInputRef.current.click()}
            >
              <Image />
            </IconButton>
            
            <IconButton 
              color="primary" 
              onClick={() => videoInputRef.current.click()}
            >
              <Videocam />
            </IconButton>
            
            <Button
              variant="contained"
              color="primary"
              endIcon={<Send />}
              onClick={handleSendMessage}
              disabled={(!newMessage.trim() && !uploadedImage && !uploadedVideo) || isLoading}
            >
              Send
            </Button>
          </Box>
          
          <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
            Note: AI responses are for general advice only. For medical concerns, please consult a veterinarian.
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default AIExpert;