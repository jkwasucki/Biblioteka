import Authentication from '@/Components/Login';
import React, { useState } from 'react';

export default function Home() {

  return (
    <main className="w-screen h-screen flex flex-col items-start justify-start p-12">
        <Authentication/>
    </main>
  );
}