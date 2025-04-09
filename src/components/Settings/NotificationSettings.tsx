import React, { useState } from 'react'
import { toast } from "sonner"

const NotificationSettings : React.FC = () => {
    const [error, setError] = useState('');
    return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Notification Settings</h2>
            <p className="text-gray-500">Set your notification settings</p>
          </div>
    
          {error &&
            toast.error(error, { duration: 4000 }) 
          }
        </div>
      );
    };

export default NotificationSettings
