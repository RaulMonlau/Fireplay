// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiUser, FiMessageSquare, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from '@/contexts/AuthContext';

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
    }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await addDoc(collection(db, 'messages'), {
        ...data,
        userId: user?.uid || null,
        createdAt: new Date()
      });
      
      setSubmitSuccess(true);
      reset();
      
      // Resetear el éxito después de 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
      console.error('Error submitting contact form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contacto</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de contacto */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Información</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-[var(--color-primary)]">info@fireplay.com</p>
                </div>
                <div>
                  <h3 className="font-medium">Teléfono</h3>
                  <p>+34 911 222 333</p>
                </div>
                <div>
                  <h3 className="font-medium">Dirección</h3>
                  <p>Calle Gran Vía 1, 28013 Madrid, España</p>
                </div>
                <div>
                  <h3 className="font-medium">Horario</h3>
                  <p>Lunes a Viernes: 9:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Formulario de contacto */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Envíanos un mensaje</h2>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-md flex items-center">
                  <FiCheck className="mr-2 flex-shrink-0" />
                  <p>Mensaje enviado correctamente. Nos pondremos en contacto contigo lo antes posible.</p>
                </div>
              )}
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-md flex items-center">
                  <FiAlertCircle className="mr-2 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <FiUser />
                    </div>
                    <input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } dark:bg-gray-700 dark:text-white`}
                      {...register('name', { required: 'El nombre es obligatorio' })}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                  )}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <FiMail />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } dark:bg-gray-700 dark:text-white`}
                      {...register('email', { 
                        required: 'El email es obligatorio',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Dirección de email inválida'
                        }
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>
                
                {/* Asunto */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Asunto
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Asunto de tu mensaje"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                      errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } dark:bg-gray-700 dark:text-white`}
                    {...register('subject', { required: 'El asunto es obligatorio' })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject.message}</p>
                  )}
                </div>
                
                {/* Mensaje */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mensaje
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 text-gray-500">
                      <FiMessageSquare />
                    </div>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Escribe tu mensaje aquí"
                      className={`pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                        errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      } dark:bg-gray-700 dark:text-white`}
                      {...register('message', { 
                        required: 'El mensaje es obligatorio',
                        minLength: {
                          value: 10,
                          message: 'El mensaje debe tener al menos 10 caracteres'
                        }
                      })}
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  fullWidth
                >
                  Enviar mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}