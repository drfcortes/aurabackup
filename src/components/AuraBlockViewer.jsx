import React from 'react';
import JsonActions from './JsonActions.jsx';

export default function AuraBlockViewer({ uid, block }) {
    if (!block) {
        return <p className="text-red-600">⚠️ Error: Block data not available.</p>;
    }

    return (
        <section className="bg-white p-6 rounded-xl shadow border border-gray-300 space-y-4">
            <h2 className="text-xl font-semibold text-aura-olive">
                Metadata for <span className="text-aura-deep">{uid}</span>
            </h2>

            <div className="space-y-2 text-sm">
                {Object.entries(block).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-start">
                        <span className="sm:w-40 font-semibold text-aura-deep">{key}:</span>
                        <span className="text-gray-800 break-all">
              {typeof value === 'boolean'
                  ? value.toString()
                  : typeof value === 'object'
                      ? JSON.stringify(value, null, 2)
                      : value}
            </span>
                    </div>
                ))}
            </div>

            <div className="flex space-x-2">
                <JsonActions jsonData={block} />
            </div>

            <details className="mt-6">
                <summary className="cursor-pointer text-sm text-aura-olive hover:text-aura-deep underline">
                    🔍 Ver JSON completo
                </summary>
                <pre className="mt-2 bg-gray-100 p-4 rounded text-xs overflow-auto">
          {JSON.stringify(block, null, 2)}
        </pre>
            </details>
        </section>
    );
}
