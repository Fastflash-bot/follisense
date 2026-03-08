import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Leaf } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const StylistHome = () => {
  const navigate = useNavigate();
  const { clientObservations } = useApp();

  return (
    <div className="page-container pt-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <Leaf size={20} className="text-primary" strokeWidth={1.8} />
          <span className="text-sm font-semibold text-foreground">ScalpSense</span>
          <span className="text-[10px] font-medium bg-secondary text-foreground px-2 py-0.5 rounded-full">Stylist</span>
        </div>
        <h1 className="text-2xl font-semibold mb-1">ScalpSense for Stylists</h1>
        <p className="text-muted-foreground text-sm mb-6">Document scalp observations for your clients</p>

        {/* New observation button */}
        <button
          onClick={() => navigate('/stylist/observation')}
          className="w-full h-14 bg-primary text-primary-foreground rounded-xl font-semibold text-base btn-press flex items-center justify-center gap-2 mb-8"
        >
          <Plus size={20} strokeWidth={2} />
          New client observation
        </button>

        {/* Recent observations */}
        <h3 className="font-semibold text-foreground mb-3">Recent observations</h3>
        <div className="space-y-2">
          {clientObservations.map(obs => (
            <div key={obs.id} className="card-elevated p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-sm font-semibold text-foreground">{obs.clientName}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{obs.observations[0]}</p>
                  <p className="text-xs text-muted-foreground">{obs.date}</p>
                </div>
              </div>
              <span className={`status-dot ${obs.risk}`} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StylistHome;
