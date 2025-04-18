import { AlertTriangle } from 'lucide-react';

const NoDiscordWebhook = () => {
  return (
    <div className="flex items-start gap-3 bg-yellow-100 text-yellow-800 px-4 py-3 mb-4 rounded-md border border-yellow-300">
    <AlertTriangle className="w-5 h-5 mt-1" />
    <div className="text-sm">
      <p className="font-medium">
        No Discord Webhook is connected to this account. For privacy and extended storage, it is highly recommended to connect one.
      </p>
      <p className="mt-1">
        Without a webhook, your data will be temporarily stored on our servers and may expire after 1 month (subject to change). Connecting a Discord webhook ensures more privacy and longer data retention.
      </p>
      <a href="/settings/discord" className="text-yellow-900 underline mt-1 inline-block">
        Learn how to set up a Discord Webhook
      </a>
    </div>
  </div>
  )
}

export default NoDiscordWebhook
