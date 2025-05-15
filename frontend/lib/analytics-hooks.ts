/**
 * Analytics Hooks - Sistema de rastreamento de eventos e métricas
 * 
 * Este módulo fornece hooks e utilitários para rastreamento de eventos e métricas
 * em toda a aplicação, com suporte a múltiplas plataformas de analytics.
 * 
 * Características:
 * - Integração com Google Analytics, Mixpanel e outras plataformas
 * - Rastreamento de eventos personalizados
 * - Métricas de uso e performance
 * - Suporte a A/B testing
 */

import { useCallback, useEffect, useState } from 'react'

// Tipos para eventos e configurações
export type EventName = 
  // Eventos de navegação
  | 'page_view' 
  | 'page_exit'
  
  // Eventos de chat
  | 'chat_started'
  | 'chat_message_sent'
  | 'chat_message_received'
  | 'chat_model_changed'
  | 'chat_tool_selected'
  | 'chat_personality_selected'
  | 'chat_preset_selected'
  | 'chat_file_uploaded'
  
  // Eventos de canvas/workflow
  | 'canvas_created'
  | 'canvas_edited'
  | 'canvas_saved'
  | 'canvas_exported'
  | 'node_added'
  | 'node_connected'
  | 'workflow_executed'
  
  // Eventos de UI
  | 'theme_changed'
  | 'sidebar_toggled'
  | 'modal_opened'
  | 'modal_closed'
  | 'notification_shown'
  | 'keyboard_shortcut_used'
  
  // Eventos de sistema
  | 'error_occurred'
  | 'performance_issue'
  | 'feature_discovered'
  
  // Eventos customizados
  | 'custom_event'
  | string

export interface EventProperties {
  [key: string]: any
}

export interface AnalyticsConfig {
  enabled: boolean
  googleAnalyticsId?: string
  mixpanelToken?: string
  amplitudeApiKey?: string
  debugMode?: boolean
  anonymizeIp?: boolean
  consentRequired?: boolean
}

// Estado global para configuração de analytics
let analyticsConfig: AnalyticsConfig = {
  enabled: process.env.NODE_ENV === 'production',
  debugMode: process.env.NODE_ENV === 'development',
  anonymizeIp: true,
  consentRequired: true
}

// Inicialização de serviços externos (carregados sob demanda)
const initGoogleAnalytics = (id: string) => {
  if (typeof window !== 'undefined' && !window.gtag) {
    // Código para inicializar Google Analytics
    console.log('[Analytics] Inicializando Google Analytics:', id)
    // Implementação real seria adicionada aqui
  }
}

const initMixpanel = (token: string) => {
  if (typeof window !== 'undefined' && !window.mixpanel) {
    // Código para inicializar Mixpanel
    console.log('[Analytics] Inicializando Mixpanel:', token)
    // Implementação real seria adicionada aqui
  }
}

const initAmplitude = (apiKey: string) => {
  if (typeof window !== 'undefined' && !window.amplitude) {
    // Código para inicializar Amplitude
    console.log('[Analytics] Inicializando Amplitude:', apiKey)
    // Implementação real seria adicionada aqui
  }
}

/**
 * Configura o sistema de analytics
 * @param config Configurações para o sistema de analytics
 */
export const configureAnalytics = (config: Partial<AnalyticsConfig>) => {
  analyticsConfig = { ...analyticsConfig, ...config }
  
  // Inicializar serviços conforme configuração
  if (analyticsConfig.enabled) {
    if (analyticsConfig.googleAnalyticsId) {
      initGoogleAnalytics(analyticsConfig.googleAnalyticsId)
    }
    
    if (analyticsConfig.mixpanelToken) {
      initMixpanel(analyticsConfig.mixpanelToken)
    }
    
    if (analyticsConfig.amplitudeApiKey) {
      initAmplitude(analyticsConfig.amplitudeApiKey)
    }
  }
  
  if (analyticsConfig.debugMode) {
    console.log('[Analytics] Configuração atualizada:', analyticsConfig)
  }
}

/**
 * Hook para utilizar analytics em componentes React
 * @returns Métodos para rastreamento de eventos e métricas
 */
export const useAnalytics = () => {
  const [userConsent, setUserConsent] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('analytics_consent') === 'true'
    }
    return false
  })
  
  // Verificar se o rastreamento está habilitado
  const isTrackingEnabled = useCallback(() => {
    return analyticsConfig.enabled && 
           (!analyticsConfig.consentRequired || userConsent)
  }, [userConsent])
  
  // Rastrear visualização de página
  const trackPageView = useCallback((pageId: string, properties?: EventProperties) => {
    if (!isTrackingEnabled()) return
    
    const eventData = {
      page_id: pageId,
      page_title: typeof document !== 'undefined' ? document.title : '',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString(),
      ...properties
    }
    
    // Enviar para todos os serviços configurados
    if (analyticsConfig.googleAnalyticsId && window.gtag) {
      window.gtag('event', 'page_view', eventData)
    }
    
    if (analyticsConfig.mixpanelToken && window.mixpanel) {
      window.mixpanel.track('page_view', eventData)
    }
    
    if (analyticsConfig.amplitudeApiKey && window.amplitude) {
      window.amplitude.getInstance().logEvent('page_view', eventData)
    }
    
    if (analyticsConfig.debugMode) {
      console.log('[Analytics] Page View:', eventData)
    }
  }, [isTrackingEnabled])
  
  // Rastrear evento personalizado
  const trackEvent = useCallback((eventName: EventName, properties?: EventProperties) => {
    if (!isTrackingEnabled()) return
    
    const eventData = {
      event_name: eventName,
      timestamp: new Date().toISOString(),
      ...properties
    }
    
    // Enviar para todos os serviços configurados
    if (analyticsConfig.googleAnalyticsId && window.gtag) {
      window.gtag('event', eventName, eventData)
    }
    
    if (analyticsConfig.mixpanelToken && window.mixpanel) {
      window.mixpanel.track(eventName, eventData)
    }
    
    if (analyticsConfig.amplitudeApiKey && window.amplitude) {
      window.amplitude.getInstance().logEvent(eventName, eventData)
    }
    
    if (analyticsConfig.debugMode) {
      console.log('[Analytics] Event:', eventName, eventData)
    }
  }, [isTrackingEnabled])
  
  // Rastrear erro
  const trackError = useCallback((error: Error, context?: string) => {
    if (!isTrackingEnabled()) return
    
    const errorData = {
      error_message: error.message,
      error_stack: error.stack,
      error_context: context,
      timestamp: new Date().toISOString()
    }
    
    trackEvent('error_occurred', errorData)
  }, [isTrackingEnabled, trackEvent])
  
  // Rastrear performance
  const trackPerformance = useCallback((metricName: string, value: number, context?: string) => {
    if (!isTrackingEnabled()) return
    
    const performanceData = {
      metric_name: metricName,
      metric_value: value,
      metric_context: context,
      timestamp: new Date().toISOString()
    }
    
    trackEvent('performance_issue', performanceData)
  }, [isTrackingEnabled, trackEvent])
  
  // Rastrear interação com chat
  const trackChatInteraction = useCallback((action: string, modelId?: string, messageContent?: string) => {
    if (!isTrackingEnabled()) return
    
    const chatData = {
      chat_action: action,
      model_id: modelId,
      message_length: messageContent ? messageContent.length : 0,
      has_attachments: messageContent?.includes('file:'),
      timestamp: new Date().toISOString()
    }
    
    trackEvent(`chat_${action}` as EventName, chatData)
  }, [isTrackingEnabled, trackEvent])
  
  // Rastrear interação com canvas
  const trackCanvasInteraction = useCallback((action: string, nodeCount?: number, edgeCount?: number) => {
    if (!isTrackingEnabled()) return
    
    const canvasData = {
      canvas_action: action,
      node_count: nodeCount,
      edge_count: edgeCount,
      timestamp: new Date().toISOString()
    }
    
    trackEvent(`canvas_${action}` as EventName, canvasData)
  }, [isTrackingEnabled, trackEvent])
  
  // Gerenciar consentimento do usuário
  const setAnalyticsConsent = useCallback((consent: boolean) => {
    setUserConsent(consent)
    if (typeof window !== 'undefined') {
      localStorage.setItem('analytics_consent', consent.toString())
    }
    
    if (analyticsConfig.debugMode) {
      console.log('[Analytics] Consentimento atualizado:', consent)
    }
  }, [])
  
  // Inicializar rastreamento de performance web vitals
  useEffect(() => {
    if (isTrackingEnabled() && typeof window !== 'undefined') {
      // Código para inicializar rastreamento de web vitals
      const reportWebVitals = ({ name, delta, id }: any) => {
        trackPerformance(name, delta, id)
      }
      
      // Em um projeto real, isso seria integrado com Next.js reportWebVitals
    }
  }, [isTrackingEnabled, trackPerformance])
  
  return {
    trackPageView,
    trackEvent,
    trackError,
    trackPerformance,
    trackChatInteraction,
    trackCanvasInteraction,
    setAnalyticsConsent,
    hasConsent: userConsent,
    isEnabled: isTrackingEnabled()
  }
}

// Tipos para TypeScript global
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    mixpanel?: any
    amplitude?: any
  }
}

// Exportar uma instância padrão para uso fora de componentes React
export const Analytics = {
  configure: configureAnalytics,
  
  trackEvent: (eventName: EventName, properties?: EventProperties) => {
    if (!analyticsConfig.enabled) return
    
    if (analyticsConfig.debugMode) {
      console.log('[Analytics] Event (Global):', eventName, properties)
    }
    
    // Implementação simplificada para uso fora de componentes
    // Em um caso real, isso enviaria para os serviços configurados
  }
}

export default useAnalytics
