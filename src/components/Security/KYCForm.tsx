
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { useKYC } from '@/hooks/useKYC'
import { Shield, CheckCircle, Clock, AlertTriangle, Upload } from 'lucide-react'
import { toast } from 'sonner'

export const KYCForm: React.FC = () => {
  const { kycStatus, loading, submitKYC, isKYCApproved, needsKYC } = useKYC()
  const [formData, setFormData] = useState({
    verification_level: 'basic',
    document_type: '',
    document_number: '',
    document_country: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const result = await submitKYC(formData)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('KYC enviado com sucesso! Aguarde a análise.')
      }
    } catch (error) {
      toast.error('Erro ao enviar KYC')
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusBadge = () => {
    if (!kycStatus) return null

    const statusConfig = {
      pending: { icon: Clock, color: 'bg-yellow-100 text-yellow-800', label: 'Pendente' },
      approved: { icon: CheckCircle, color: 'bg-green-100 text-green-800', label: 'Aprovado' },
      rejected: { icon: AlertTriangle, color: 'bg-red-100 text-red-800', label: 'Rejeitado' },
      expired: { icon: AlertTriangle, color: 'bg-gray-100 text-gray-800', label: 'Expirado' }
    }

    const config = statusConfig[kycStatus.status]
    const Icon = config.icon

    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Verificação KYC
          {kycStatus && getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isKYCApproved && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Sua verificação KYC foi aprovada! Você pode investir em campanhas que exigem KYC.
            </AlertDescription>
          </Alert>
        )}

        {kycStatus?.status === 'rejected' && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              KYC rejeitado: {kycStatus.rejection_reason || 'Motivo não especificado'}
            </AlertDescription>
          </Alert>
        )}

        {(needsKYC || kycStatus?.status === 'rejected') && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Nível de Verificação
              </label>
              <Select 
                value={formData.verification_level}
                onValueChange={(value) => setFormData(prev => ({ ...prev, verification_level: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Básico</SelectItem>
                  <SelectItem value="advanced">Avançado</SelectItem>
                  <SelectItem value="institutional">Institucional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Tipo de Documento
              </label>
              <Select 
                value={formData.document_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, document_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="rg">RG</SelectItem>
                  <SelectItem value="passport">Passaporte</SelectItem>
                  <SelectItem value="cnh">CNH</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Número do Documento
              </label>
              <Input
                type="text"
                value={formData.document_number}
                onChange={(e) => setFormData(prev => ({ ...prev, document_number: e.target.value }))}
                placeholder="Digite o número do documento"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                País
              </label>
              <Select 
                value={formData.document_country}
                onValueChange={(value) => setFormData(prev => ({ ...prev, document_country: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BR">Brasil</SelectItem>
                  <SelectItem value="US">Estados Unidos</SelectItem>
                  <SelectItem value="EU">União Europeia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Enviar KYC
                </>
              )}
            </Button>
          </form>
        )}

        {kycStatus?.status === 'pending' && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Sua verificação KYC está sendo analisada. Isso pode levar até 48 horas.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
