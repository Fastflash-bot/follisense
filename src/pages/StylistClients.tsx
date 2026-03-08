import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const StylistClients = () => {
  const { clientObservations } = useApp();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="page-container pt-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-semibold mb-6">Client Observations</h1>

        <div className="space-y-3">
          {clientObservations.map(obs => (
            <button
              key={obs.id}
              onClick={() => setExpanded(expanded === obs.id ? null : obs.id)}
              className="card-elevated p-4 w-full text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-foreground">{obs.clientName}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{obs.clientName}</p>
                    <p className="text-xs text-muted-foreground">{obs.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`status-dot ${obs.risk}`} />
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground transition-transform ${expanded === obs.id ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {expanded === obs.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 mt-3 border-t border-border space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Observations</p>
                        <ul className="mt-1 space-y-0.5">
                          {obs.observations.map(o => (
                            <li key={o} className="text-sm text-foreground">• {o}</li>
                          ))}
                        </ul>
                      </div>
                      {obs.photos.length > 0 && (
                        <div>
                          <p className="text-xs text-muted-foreground">Photos</p>
                          <p className="text-sm text-foreground">{obs.photos.join(', ')}</p>
                        </div>
                      )}
                      {obs.notes && (
                        <div>
                          <p className="text-xs text-muted-foreground">Notes</p>
                          <p className="text-sm text-foreground">{obs.notes}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StylistClients;
