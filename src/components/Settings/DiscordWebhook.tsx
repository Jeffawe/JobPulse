import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import { ExternalLink, Check, AlertCircle, Info, Bot } from "lucide-react"
import axios from 'axios';
import { User } from '../types/auth';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const DiscordIntegration: React.FC = () => {
  const [webhookUrl, setWebhookUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'bot' | 'webhook'>('bot')

  const { user, setUser } = useAuth();

  const [webhookEnabled, setWebhookEnabled] = useState<boolean>(user?.discord_webhook || false);

  useEffect(() => {
    if (user) {
      setWebhookEnabled(user.discord_webhook || false);
    }
  }, [user]);

  const handleSave = async () => {
    if (!webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
      setError('Please enter a valid Discord Webhook URL')
      toast.error('Please enter a valid Discord Webhook URL', { duration: 4000 })
      setSuccess(false)
      return
    }

    setIsSubmitting(true);

    const updatedData = {
      discord_webhook: webhookUrl,
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
      setWebhookEnabled(true);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message;
      setWebhookEnabled(false);
      setError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }

    setError('')
    setSuccess(true)
    toast.success('Webhook saved successfully!', { duration: 3000 })
  }

  const webhookSteps = [
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

  const botSteps = [
    {
      title: "Add our bot to your server",
      description: "Click the button below to authorize our bot to your Discord server",
    },
    {
      title: "Select a channel",
      description: "Choose which channel you want the bot to post notifications to",
    },
    {
      title: "Run the setup command",
      description: "Type /setup followed by your email address in the channel",
    },
    {
      title: "Verify connection",
      description: "Once you get a confirmation message. You should be good to go!",
    }
  ]

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-700 p-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 127.14 96.36">
              <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
          </span>
          Discord Integration
        </h2>
        <p className="text-gray-500 mt-2">
          Integrate with Discord to receive notifications and store your data privately on your own server.
        </p>
      </div>

      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex items-start gap-3">
        <div className="text-indigo-600 mt-1">
          <Info size={20} />
        </div>
        <div>
          <h4 className="font-medium text-indigo-800">Why use Discord integration?</h4>
          <p className="text-indigo-700 text-sm">Store your data privately on your own channel with enhanced features. Using our bot provides the best experience with frontend updates and data management.</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('bot')}
            className={`px-4 py-2 font-medium text-sm transition-colors duration-200 border-b-2 ${activeTab === 'bot'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            <div className="flex items-center gap-2">
              <Bot size={16} />
              Bot Setup (Recommended)
            </div>
          </button>
          <button
            onClick={() => setActiveTab('webhook')}
            className={`px-4 py-2 font-medium text-sm transition-colors duration-200 border-b-2 ${activeTab === 'webhook'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              Manual Webhook
            </div>
          </button>
        </div>
      </div>

      {/* Bot Setup Content */}
      {activeTab === 'bot' && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
            <div className="text-blue-600 mt-1">
              <Bot size={20} />
            </div>
            <div>
              <h4 className="font-medium text-blue-800">Bot Integration (Recommended)</h4>
              <p className="text-blue-700 text-sm">Our Discord bot simplifies setup and provides enhanced features. Just add the bot to your server and run a simple setup command.</p>
              <p className="text-blue-700 text-sm mt-1">Your email: <span className="font-medium">{user?.email || 'example@email.com'}</span></p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
              <span className="h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">?</span>
              Bot Setup Guide
            </h3>

            <div className="space-y-6">
              {botSteps.map((step, index) => (
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
            <h3 className="font-medium text-gray-800">Add Bot to Your Server</h3>
            <p className="text-gray-600 text-sm">Click the button below to add our Discord bot to your server.</p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://discord.com/oauth2/authorize?client_id=1365546055835455569&permissions=2684370000&scope=bot+applications.commands"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1"
              >
                <Bot size={18} />
                Add Bot to Server
              </a>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-blue-800 text-sm flex items-start gap-2">
              <Info size={18} className="text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">After adding the bot:</p>
                <p className="text-blue-700">Run the following command in your Discord channel:</p>
                <code className="bg-blue-100 p-1 rounded text-blue-900 mt-1 inline-block">/setup {user?.email || 'your@email.com'}</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Webhook Setup Content */}
      {activeTab === 'webhook' && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
              <span className="h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">?</span>
              Manual Webhook Setup Guide
            </h3>

            <div className="space-y-6">
              {webhookSteps.map((step, index) => (
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
              {webhookEnabled ? (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <Check size={18} />
                  Webhook already saved
                </div>
              ) : (
                <div>
                  <label htmlFor="webhook" className="block text-sm font-medium text-gray-700 mb-1">Discord Webhook URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 127.14 96.36" className="text-gray-400">
                        <path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                      </svg>
                    </div>
                    <input
                      id="webhook"
                      type="text"
                      value={webhookUrl}
                      disabled={user?.isTestUser}
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
                        disabled={user?.isTestUser}
                      >
                        {user?.isTestUser
                          ? <p>Use Bot Option as this is a Test Account</p>
                          :
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        }
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

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-start gap-3">
            <AlertCircle size={20} className="text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Manual webhooks have limited functionality</h4>
              <p className="text-yellow-700 text-sm">For frontend updates and enhanced data management, we recommend using our Discord bot integration.</p>
            </div>
          </div>
        </div>
      )
      }

      <div className="text-xs text-gray-500 flex items-center gap-1">
        <Info size={12} />
        Need help? Check out our <a href="#" className="text-indigo-600 hover:underline inline-flex items-center gap-1">Discord setup documentation <ExternalLink size={10} /></a>
      </div>
    </div >
  )
}

export default DiscordIntegration