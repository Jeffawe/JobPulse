import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  MessageSquare, 
  Send, 
  Mail, 
  Shield, 
  Bell, 
  Calendar, 
  Trash, 
  Server, 
  Home, 
  MailCheck 
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const HelpSupport: React.FC = () => {
  const { user } = useAuth();

  const faqs = [
    {
      question: "What does JobPulse do?",
      answer: "JobPulse scans your job-related emails and sends you timely updates about your application status through your preferred notification channel (like WhatsApp or SMS).",
      icon: <MailCheck className="h-4 w-4 text-blue-500" />
    },
    {
      question: "How do I connect my email?",
      answer: "Once you sign in, JobPulse automatically connects your email account. No passwords are ever stored.",
      icon: <Mail className="h-4 w-4 text-green-500" />
    },
    {
      question: "How do I receive notifications?",
      answer: "Go to your Notification Settings and choose one or more channels (e.g., WhatsApp or Normal Message). Then enter the corresponding phone numbers or contact details.",
      icon: <Bell className="h-4 w-4 text-purple-500" />
    },
    {
      question: "Can I choose when to be notified?",
      answer: "Yes! You can set specific job statuses like 'Interview Scheduled', 'Offer', or 'Rejected' that will trigger a notification.",
      icon: <Calendar className="h-4 w-4 text-amber-500" />
    },
    {
      question: "Is my data secure?",
      answer: "Yes. We store basic user data (No Data from your email in included in this), and everything is encrypted. Your email data is not stored as long as you put in a Discord Webhook. No Discord Webhook, means data is stored temporarily on our servers for maximum of a month.",
      icon: <Shield className="h-4 w-4 text-red-500" />
    },
    {
      question: "What is a Discord Webhook and why should I add one?",
      answer: "A Discord Webhook allows us to send your job updates directly to your own private Discord channel. This gives you full control and extended storage without anything being stored on our database.",
      icon: <Server className="h-4 w-4 text-indigo-500" />
    },
    {
      question: "Can I delete my data?",
      answer: "Absolutely. You can disconnect your email or delete your account anytime in the Settings page. Any data we have will be wiped from our system.",
      icon: <Trash className="h-4 w-4 text-red-500" />
    },
    {
      question: "Can I run this app locally",
      answer: "All of the code behind this is available on GitHub and you are free (as long as you credit me) to take this and run it locally on your system or any Virtual Machine. A section for a setup for this will be added soon",
      icon: <Home className="h-4 w-4 text-cyan-500" />
    },
    {
      question: "I have more questions that this does not answer",
      answer: "If you have any additional questions or need further assistance, please don't hesitate to send a message below or shoot me a mail at awagujeffery@gmail.com. I'm here to help!",
      icon: <HelpCircle className="h-4 w-4 text-blue-500" />
    }
  ];

  const [subject, setSubject] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);

  const sendDiscordSupportMessage = async (subject: string, text: string, webhookUrl: string) => {
    // Check if required parameters are provided
    if (!subject || !text || !webhookUrl) {
      toast.error('Please fill in all fields');
      throw new Error('Missing required parameters: subject, text, or webhookUrl');
    }

    setSending(true);
    
    try {
      // Create the message payload for Discord
      const payload = {
        username: "Job Pulse Support Bot",
        // Optional: avatar URL for the webhook message
        avatar_url: "https://cdn.discordapp.com/attachments/123456789/jobpulse_logo.png", // You can use your actual logo URL
        // Content is the main message body
        content: `**New Support Request**`,
        // Embeds allow for rich formatting
        embeds: [
          {
            title: subject,
            description: text,
            color: 3447003, // Discord blue color
            timestamp: new Date().toISOString(),
            footer: {
              text: `Sent from JobPulse Support by ${user?.email || 'Anonymous'}`,
            }
          }
        ]
      };

      // Send the request to Discord webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Discord webhook error: ${response.status}`);
      }

      toast.success('Message sent successfully!');
      setSubject('');
      setText('');
      return response;
    } catch (error) {
      console.error('Failed to send message to Discord:', error);
      toast.error('Failed to send message. Please try again later.');
      throw error;
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendDiscordSupportMessage(subject, text, import.meta.env.VITE_DISCORD_WEBHOOK);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Help & Support</h2>
        <p className="text-gray-500 mt-2">Get help with JobPulse and find answers to your questions</p>
      </div>

      {/* FAQs */}
      <Card className="shadow-md border-t-4 border-t-blue-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <HelpCircle className="h-6 w-6 text-blue-500" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-gray-600">
            Find answers to common questions about JobPulse
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-blue-100">
                <AccordionTrigger className="hover:text-blue-700 flex items-center">
                  <div className="flex items-center gap-2">
                    {faq.icon}
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pl-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="shadow-md border-t-4 border-t-purple-500">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <MessageSquare className="h-6 w-6 text-purple-500" />
            Contact Support
          </CardTitle>
          <CardDescription className="text-gray-600">
            Get in touch with our support team for personalized assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <Input 
                placeholder="Subject" 
                onChange={(e) => setSubject(e.target.value)} 
                value={subject} 
                className="pl-10 border border-purple-200 rounded-md p-2 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="relative">
              <Textarea
                placeholder="Describe your issue or question..."
                className="pl-10 h-32 border border-purple-200 rounded-md p-2 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                onChange={(e) => setText(e.target.value)}
                value={text}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 font-medium flex items-center justify-center gap-2"
              disabled={sending}
            >
              {sending ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-gray-50 text-sm text-gray-500 italic">
          <p>Our support team typically responds within 24 hours on business days.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HelpSupport;