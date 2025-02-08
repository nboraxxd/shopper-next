import { z } from 'zod'

import { name, username } from '@/features/auth/schemas'
import { PROFILE_ERROR_MESSAGES } from '@/features/profile/constants'
import { ADDRESS_ERROR_MESSAGES } from '@/features/address/constants'

export const regionSchema = z.object({
  name: z.string().optional(),
  code: z.number().optional(),
})

export type Region = z.infer<typeof regionSchema>

export const addNewAddressSchema = z
  .object({
    fullName: name,
    email: username,
    phone: z
      .string()
      .min(1, PROFILE_ERROR_MESSAGES.PHONE_NUMBER_REQUIRED)
      .regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, PROFILE_ERROR_MESSAGES.INVALID_PHONE_NUMBER),
    province: z.object(regionSchema.shape, { message: ADDRESS_ERROR_MESSAGES.PROVINCE_REQUIRED }),
    district: z.object(regionSchema.shape, { message: ADDRESS_ERROR_MESSAGES.DISTRICT_REQUIRED }),
    ward: z.object(regionSchema.shape, { message: ADDRESS_ERROR_MESSAGES.WARD_REQUIRED }),
    address: z
      .string({ required_error: ADDRESS_ERROR_MESSAGES.ADDRESS_REQUIRED })
      .min(1, ADDRESS_ERROR_MESSAGES.ADDRESS_REQUIRED),
    default: z.boolean().optional(),
  })
  .superRefine(({ province, district, ward }, ctx) => {
    if (!province.code || province.code < 0 || !province.name || province.name.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['province'],
        message: ADDRESS_ERROR_MESSAGES.INVALID_PROVINCE,
      })
    }

    if (!district.code || district.code < 0 || !district.name || district.name.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['district'],
        message: ADDRESS_ERROR_MESSAGES.INVALID_DISTRICT,
      })
    }

    if (!ward.code || ward.code < 0 || !ward.name || ward.name.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['ward'],
        message: ADDRESS_ERROR_MESSAGES.INVALID_WARD,
      })
    }
  })

export type AddNewAddressType = z.infer<typeof addNewAddressSchema>

export type AddNewAddressReqBody = Omit<AddNewAddressType, 'province' | 'district' | 'ward'> & {
  province: string
  district: string
}

export const updateAddressSchema = addNewAddressSchema

export type UpdateAddressType = z.infer<typeof updateAddressSchema>

export type UpdateAddressReqBody = Partial<
  Omit<UpdateAddressType, 'province' | 'district' | 'ward'> & {
    province: string
    district: string
  }
>
