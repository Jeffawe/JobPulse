import React, { useState } from 'react'
import { toast } from "sonner"
import { ExternalLink, Check, AlertCircle, Info } from "lucide-react"
import axios from 'axios';
import { User } from '../types/auth';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const DiscordWebhook : React.FC = () => {
  const [webhookUrl, setWebhookUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState<{} | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { user, setUser } = useAuth();

  const handleSave = async () => {
    if (!webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
      setError('Please enter a valid Discord Webhook URL')
      toast.error('Please enter a valid Discord Webhook URL', { duration: 4000 })
      setSuccess(false)
      return
    }

    setIsSubmitting(true);

    const updatedData = {
      discord_webhook: webhookUrl || user?.discord_webhook,
    };

    try {
      const response = await axios.patch<User>(
        `${API_BASE_URL}/auth/update`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'api-key': API_KEY,
          },
        }
      );

      setUser(response.data);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message;
      setError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }

    setError('')
    setSuccess(true)
    toast.success('Webhook saved successfully!', { duration: 3000 })
  }

  const steps = [
    {
      title: "Create a Discord Account",
      description: "If you don't already have one, sign up at discord.com",
    },
    {
      title: "Create a Server",
      description: "Click the plus (+) icon on the sidebar and select 'Create My Own'",
    },
    {
      title: "Create a Text Channel",
      description: "Choose an existing channel or create a new one for your notifications",
    },
    {
      title: "Enable Webhooks",
      description: "Go to channel settings > Integrations > Create Webhook",
    },
    {
      title: "Copy the Webhook URL",
      description: "Copy the webhook URL and paste it into the input box below",
    }
  ]

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 p-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 127.14 96.36">
              <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
          </span>
          Discord Webhook Integration
        </h2>
        <p className="text-gray-500 mt-2">
          Set up your Discord Webhook to receive real-time notifications directly in your Discord server.
        </p>
      </div>

      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex items-start gap-3">
        <div className="text-indigo-600 mt-1">
          <Info size={20} />
        </div>
        <div>
          <h4 className="font-medium text-indigo-800">Why use Discord notifications?</h4>
          <p className="text-indigo-700 text-sm">Store your data privately on your own channel.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <span className="h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">?</span>
          Setup Guide
        </h3>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`border rounded-lg transition-all ${activeStep === index ? 'border-indigo-400 shadow-md' : 'border-gray-200'}`}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
            >
              <div className="flex items-center p-4 cursor-pointer">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-medium text-sm mr-3 ${activeStep === index ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{step.title}</h4>
                  <p className="text-gray-500 text-sm">{step.description}</p>
                </div>
                <div className={`transform transition-transform ${activeStep === index ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              
              {activeStep === index && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      <p className="mt-2 text-sm">Step {index + 1} Illustration</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-medium text-gray-800 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">3</span>
          Enter your Discord Webhook URL
        </h3>
        
        <div>
          <label htmlFor="webhook" className="block text-sm font-medium text-gray-700 mb-1">Discord Webhook URL</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 127.14 96.36" className="text-gray-400">
                <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
              </svg>
            </div>
            <input
              id="webhook"
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://discord.com/api/webhooks/..."
              className={`w-full pl-10 pr-12 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${error ? 'border-red-300 focus:ring-red-200' : 'focus:ring-indigo-200 border-gray-300'}`}
            />
            {webhookUrl && (
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setWebhookUrl('');
                  setError('');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle size={14} />
              {error}
            </p>
          )}
          {webhookUrl && !error && (
            <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
              <Check size={14} />
              URL format is valid
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1"
          >
            <Check size={18} />
            {isSubmitting ? 'Saving...' : 'Save Webhook'}
          </button>
          
          <button
            onClick={() => setWebhookUrl('')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            Clear
          </button>
        </div>

        {success && (
          <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md text-green-800 text-sm flex items-start gap-2">
            <Check size={18} className="text-green-600 mt-0.5" />
            <div>
              <p className="font-medium">Webhook saved successfully!</p>
              <p className="text-green-700">You will now receive notifications in your Discord channel.</p>
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 flex items-center gap-1">
        <Info size={12} />
        Need help? Check out our <a href="#" className="text-indigo-600 hover:underline inline-flex items-center gap-1">Discord setup documentation <ExternalLink size={10} /></a>
      </div>
    </div>
  )
}

export default DiscordWebhook