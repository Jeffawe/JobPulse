import { AlertTriangle } from 'lucide-react';

const NoDiscordWebhook = () => {
  return (
    <div className="flex items-start gap-3 bg-yellow-100 text-yellow-800 px-4 py-3 mb-4 rounded-md border border-yellow-300">
      <AlertTriangle className="w-5 h-5 mt-1" />
      <div className="text-sm">
        <p className="font-medium">
          No Discord Webhook connected. For enhanced privacy and permanent storage, we recommend connecting one.
        </p>
        <p className="mt-1">
          Without a webhook, your data is temporarily stored on our servers and may expire after 1 month. Our Discord bot can set up and manage your data in a channel when you invite it and run the /setup command with your email.
        </p>
        <p className="mt-1">
          You can also manually provide a webhook URL for basic integration, but using our bot provides additional frontend updates and better data management.
        </p>
        <a href="/settings/discord" className="text-yellow-900 underline mt-1 inline-block">
          Set up Discord integration
        </a>
      </div>
    </div>
  )
}

export default NoDiscordWebhook