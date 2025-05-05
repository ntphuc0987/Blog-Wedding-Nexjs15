'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

const Submitbutton = () => {

    const { pending } = useFormStatus()

    return (
        <Button className='w-fit' type='submit' disabled={pending}>
            {pending ? "Submitting" : "Submit"}
        </Button>
    )
}

export default Submitbutton